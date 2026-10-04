import { body, param } from 'express-validator';

const weightValidationRules = [
	body('weight')
		.trim()
		.notEmpty()
		.withMessage('Weight is required')
		.isInt({ min: 1 })
		.withMessage('Weight must be a positive integer'),
	body('price')
		.trim()
		.notEmpty()
		.withMessage('Price is required')
		.isFloat({ min: 1 })
		.withMessage('Price must be a positive number'),
	body('quantity')
		.trim()
		.notEmpty()
		.withMessage('Quantity is required')
		.isInt({ min: 0 })
		.withMessage('Quantity must be a non-negative integer'),
	body('material_id')
		.trim()
		.notEmpty()
		.withMessage('Material ID is required')
		.isInt({ min: 1 })
		.withMessage('Material ID must be a positive integer'),
	body('manufacturer_id')
		.trim()
		.notEmpty()
		.withMessage('Manufacturer ID is required')
		.isInt({ min: 1 })
		.withMessage('Manufacturer ID must be a positive integer'),
];
const validateWeightId = [
	param('id').isInt({ min: 1 }).withMessage('Invalid Weight ID'),
];

export { weightValidationRules, validateWeightId };
