import {
	getAllMaterials,
	getAllManufacturers,
	getAllWeights,
	getWeight,
	addWeight,
} from '../models/queries.js';
import { matchedData, validationResult } from 'express-validator';

async function renderWeightForm(res, { status = 200, errors, values } = {}) {
	const [materials, manufacturers] = await Promise.all([
		getAllMaterials(),
		getAllManufacturers(),
	]);
	res.status(status).render('weightForm', {
		materials,
		manufacturers,
		errors,
		values,
	});
}
async function weightsListGet(req, res) {
	const weights = await getAllWeights();
	res.render('index', { weights: weights });
}
async function singleWeightGet(req, res) {
	const weight = await getWeight(req.params.id);
	if (!weight) {
		return res.status(404).render('error', { error: '404-Weight Not Found' });
	}
	res.send(weight);
}
async function addWeightGet(req, res) {
	await renderWeightForm(res);
}
async function addWeightPost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return renderWeightForm(res, {
			status: 400,
			errors: errors.array(),
			values: req.body,
		});
	}
	const weight = matchedData(req);
	try {
		await addWeight(weight);
		res.redirect('/');
	} catch (err) {
		if (err.code === '23505') {
			return renderWeightForm(res, {
				status: 409,
				errors: [{ msg: 'This weight is already in inventory' }],
				values: req.body,
			});
		}
		throw err;
	}
}

export { addWeightGet, addWeightPost, weightsListGet, singleWeightGet };
