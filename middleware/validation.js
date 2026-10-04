import { validationResult } from 'express-validator';

function handleParamErrors(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(404).render('error', { error: '404-Message Not Found' });
	}
	next();
}
export { handleParamErrors };
