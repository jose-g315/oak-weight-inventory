import { Router } from 'express';
import {
	weightCreateGet,
	weightCreatePost,
	weightUpdateGet,
	weightUpdatePost,
	weightDeletePost,
	weightsListGet,
} from '../controllers/weightsController.js';
import {
	editWeightValidationRules,
	weightValidationRules,
	validateId,
} from '../middleware/validationRules.js';
import { handleParamErrors } from '../middleware/validation.js';
const weightsRouter = new Router();

// create
weightsRouter.get('/new', weightCreateGet);
weightsRouter.post('/new', weightValidationRules, weightCreatePost);
// update
weightsRouter.get(
	'/:id/update',
	validateId,
	handleParamErrors,
	weightUpdateGet
);
weightsRouter.post(
	'/:id/update',
	validateId,
	handleParamErrors,
	editWeightValidationRules,
	weightUpdatePost
);
// delete
weightsRouter.post(
	'/:id/delete',
	validateId,
	handleParamErrors,
	weightDeletePost
);
// list
weightsRouter.get('/', weightsListGet);

export { weightsRouter };
