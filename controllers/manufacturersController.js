import { manufacturerQueries } from '../models/queries.js';
import { matchedData, validationResult } from 'express-validator';

const DUPLICATE_ERROR = [
	{ msg: 'A manufacturer with this name already exists' },
];
const IN_USE_ERROR = [
	{
		msg: 'This manufacturer cannot be deleted because it has existing weights associated with it. Please delete those weights first.',
	},
];

function renderForm(res, { status = 200, errors, manufacturer, input } = {}) {
	res
		.status(status)
		.render('manufacturer/form', { errors, manufacturer, input });
}
// list
async function manufacturersListGet(req, res) {
	const manufacturers = await manufacturerQueries.getAllManufacturers();
	res.render('manufacturer/manufacturers', { manufacturers: manufacturers });
}
// create
async function manufacturerCreateGet(req, res) {
	renderForm(res);
}
async function manufacturerCreatePost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return renderForm(res, {
			status: 400,
			errors: errors.array(),
			input: req.body,
		});
	}
	const manufacturer = matchedData(req);
	try {
		await manufacturerQueries.addManufacturer(manufacturer);
		res.redirect('/manufacturers');
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
async function manufacturerUpdateGet(req, res) {
	const manufacturer = await manufacturerQueries.getManufacturer(req.params.id);
	if (!manufacturer) {
		return res
			.status(404)
			.render('error', { error: '404-Manufacturer Not Found' });
	}
	return renderForm(res, { manufacturer: manufacturer });
}
async function manufacturerUpdatePost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return renderForm(res, {
			status: 400,
			errors: errors.array(),
			manufacturer: await manufacturerQueries.getManufacturer(req.params.id),
			input: req.body,
		});
	}
	const manufacturer = matchedData(req);
	try {
		await manufacturerQueries.updateManufacturer(req.params.id, manufacturer);
		res.redirect('/manufacturers');
	} catch (err) {
		if (err.code === '23505') {
			const manufacturer = await manufacturerQueries.getManufacturer(
				req.params.id
			);
			return renderForm(res, {
				status: 409,
				errors: DUPLICATE_ERROR,
				manufacturer,
				input: req.body,
			});
		}
		throw err;
	}
}
// delete
async function manufacturerDeletePost(req, res) {
	try {
		await manufacturerQueries.deleteManufacturer(req.params.id);
		res.redirect('/manufacturers');
	} catch (err) {
		if (err.code === '23503') {
			const manufacturer = await manufacturerQueries.getManufacturer(
				req.params.id
			);
			return renderForm(res, {
				status: 409,
				errors: IN_USE_ERROR,
				manufacturer,
			});
		}
		throw err;
	}
}

export {
	manufacturersListGet,
	manufacturerCreateGet,
	manufacturerCreatePost,
	manufacturerUpdateGet,
	manufacturerUpdatePost,
	manufacturerDeletePost,
};
