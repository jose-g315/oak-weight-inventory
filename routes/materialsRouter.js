import { Router } from 'express';
import {
	materialsListGet,
	materialCreateGet,
	materialCreatePost,
	materialUpdateGet,
	materialUpdatePost,
	materialDeletePost,
} from '../controllers/materialsController.js';
import {
	materialValidationRules,
	validateId,
} from '../middleware/validationRules.js';
import { handleParamErrors } from '../middleware/validation.js';

const materialsRouter = new Router();

// create
materialsRouter.get('/new', materialCreateGet);
materialsRouter.post('/new', materialValidationRules, materialCreatePost);
//update
materialsRouter.get(
	'/:id/update',
	validateId,
	handleParamErrors,
	materialUpdateGet
);
materialsRouter.post(
	'/:id/update',
	validateId,
	handleParamErrors,
	materialValidationRules,
	materialUpdatePost
);
//delete
materialsRouter.post(
	'/:id/delete',
	validateId,
	handleParamErrors,
	materialDeletePost
);
// list
materialsRouter.get('/', materialsListGet);

export { materialsRouter };
