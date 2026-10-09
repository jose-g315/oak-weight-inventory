import { materialQueries } from '../models/queries.js';
import { matchedData, validationResult } from 'express-validator';

const DUPLICATE_ERROR = [{ msg: 'A material with this name already exists' }];
const IN_USE_ERROR = [
	{
		msg: 'This material cannot be deleted because it has existing weights associated with it. Please delete those weights first.',
	},
];

function renderForm(res, { status = 200, errors, material, input } = {}) {
	res.status(status).render('material/form', { errors, material, input });
}
// list
async function materialsListGet(req, res) {
	const materials = await materialQueries.getAllMaterials();
	res.render('material/materials', { materials: materials });
}
// create
async function materialCreateGet(req, res) {
	renderForm(res);
}
async function materialCreatePost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return renderForm(res, {
			status: 400,
			errors: errors.array(),
			input: req.body,
		});
	}
	const material = matchedData(req);
	try {
		await materialQueries.addMaterial(material);
		res.redirect('/materials');
	} catch (err) {
		if (err.code === '23505') {
			return renderForm(res, {
				status: 409,
				errors: DUPLICATE_ERROR,
				input: req.body,
			});
		}
		throw err;
	}
}
// update
async function materialUpdateGet(req, res) {
	const material = await materialQueries.getMaterial(req.params.id);
	if (!material) {
		return res.status(404).render('error', { error: '404-Material Not Found' });
	}
	return renderForm(res, { material: material });
}
async function materialUpdatePost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return renderForm(res, {
			status: 400,
			errors: errors.array(),
			material: await materialQueries.getMaterial(req.params.id),
			input: req.body,
		});
	}
	const material = matchedData(req);
	try {
		await materialQueries.updateMaterial(req.params.id, material);
		res.redirect('/materials');
	} catch (err) {
		if (err.code === '23505') {
			const material = await materialQueries.getMaterial(req.params.id);
			return renderForm(res, {
				status: 409,
				errors: DUPLICATE_ERROR,
				material,
				input: req.body,
			});
		}
		throw err;
	}
}
// delete
async function materialDeletePost(req, res) {
	try {
		await materialQueries.deleteMaterial(req.params.id);
		res.redirect('/materials');
	} catch (err) {
		if (err.code === '23503') {
			const material = await materialQueries.getMaterial(req.params.id);
			return renderForm(res, {
				status: 409,
				errors: IN_USE_ERROR,
				material,
			});
		}
		throw err;
	}
}

export {
	materialsListGet,
	materialCreateGet,
	materialCreatePost,
	materialUpdateGet,
	materialUpdatePost,
	materialDeletePost,
};
