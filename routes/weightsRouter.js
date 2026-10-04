import { Router } from 'express';
import {
	addWeightGet,
	addWeightPost,
	singleWeightGet,
	weightsListGet,
} from '../controllers/weightsController.js';
import {
	weightValidationRules,
	validateWeightId,
} from '../middleware/weightValidationRule.js';
import { handleParamErrors } from '../middleware/validation.js';
const weightsRouter = Router();

weightsRouter.post('/new', weightValidationRules, addWeightPost);
weightsRouter.get('/new', addWeightGet);
weightsRouter.get('/:id', validateWeightId, handleParamErrors, singleWeightGet);
weightsRouter.get('/', weightsListGet);

export { weightsRouter };
