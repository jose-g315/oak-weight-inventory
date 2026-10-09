import {
	materialQueries,
	manufacturerQueries,
	weightQueries,
} from '../models/queries.js';
import { matchedData, validationResult } from 'express-validator';

function renderEditForm(res, { status = 200, errors, values } = {}) {
	res.status(status).render('editWeightForm', { errors, values });
}
async function renderWeightForm(res, { status = 200, errors, values } = {}) {
	const [materials, manufacturers] = await Promise.all([
		materialQueries.getAllMaterials(),
		manufacturerQueries.getAllManufacturers(),
	]);
	res.status(status).render('weightForm', {
		materials,
		manufacturers,
		errors,
		values,
	});
}
// list
async function weightsListGet(req, res) {
	const weights = await weightQueries.getAllWeights();
	res.render('index', { weights: weights });
}
// create
async function weightCreateGet(req, res) {
	await renderWeightForm(res);
}
async function weightCreatePost(req, res) {
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
		await weightQueries.addWeight(weight);
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
// update
async function weightUpdateGet(req, res) {
	const weight = await weightQueries.getWeight(req.params.id);
	if (!weight) {
		return res.status(404).render('error', { error: '404-Weight Not Found' });
	}
	return renderEditForm(res, { values: weight });
}
async function weightUpdatePost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return renderEditForm(res, {
			status: 400,
			errors: errors.array(),
			values: await weightQueries.getWeight(req.params.id),
		});
	}
	const weight = matchedData(req);
	try {
		await weightQueries.updateWeight(req.params.id, weight);
		res.redirect('/');
	} catch (err) {
		console.error(err);
		return renderEditForm(res, {
			status: 500,
			errors: [{ msg: 'Hmm something went wrong in the backend.' }],
			values: await weightQueries.getWeight(req.params.id),
		});
	}
}

// delete
async function weightDeletePost(req, res) {
	await weightQueries.deleteWeight(req.params.id);
	res.redirect('/');
}

export {
	weightsListGet,
	weightCreateGet,
	weightCreatePost,
	weightUpdateGet,
	weightUpdatePost,
	weightDeletePost,
};
