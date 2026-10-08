import { Router } from 'express';
import {
	manufacturersListGet,
	manufacturerCreateGet,
	manufacturerCreatePost,
	manufacturerUpdateGet,
	manufacturerUpdatePost,
	manufacturerDeletePost,
} from '../controllers/manufacturersController.js';
import {
	manufacturerValidationRules,
	validateId,
} from '../middleware/validationRules.js';
import { handleParamErrors } from '../middleware/validation.js';

const manufacturersRouter = new Router();

// create
manufacturersRouter.get('/new', manufacturerCreateGet);
manufacturersRouter.post(
	'/new',
	manufacturerValidationRules,
	manufacturerCreatePost
);
//update
manufacturersRouter.get(
	'/:id/update',
	validateId,
	handleParamErrors,
	manufacturerUpdateGet
);
manufacturersRouter.post(
	'/:id/update',
	validateId,
	handleParamErrors,
	manufacturerValidationRules,
	manufacturerUpdatePost
);
//delete
manufacturersRouter.post(
	'/:id/delete',
	validateId,
	handleParamErrors,
	manufacturerDeletePost
);
// list
manufacturersRouter.get('/', manufacturersListGet);

export { manufacturersRouter };
