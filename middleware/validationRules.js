import { body, param } from 'express-validator';

const manufacturerValidationRules = [
	body('name')
		.trim()
		.notEmpty()
		.withMessage('Name is required')
		.isLength({ max: 100 })
		.withMessage('Name must be at most 100 characters long'),
];
const materialValidationRules = [
	body('name')
		.trim()
		.notEmpty()
		.withMessage('Name is required')
		.isLength({ max: 50 })
		.withMessage('Name must be at most 50 characters long'),
];
const editWeightValidationRules = [
	body('price')
		.trim()
		.notEmpty()
		.withMessage('Price is required')
		.isFloat({ min: 0, max: 999999.99 })
		.withMessage('Price must be between 0 and 999999.99'),
	body('quantity')
		.trim()
		.notEmpty()
		.withMessage('Quantity is required')
		.isInt({ min: 0, max: 999999 })
		.withMessage('Quantity must be a between 0 and 999999'),
];
const weightValidationRules = [
	body('weight')
		.trim()
		.notEmpty()
		.withMessage('Weight is required')
		.isInt({ min: 1 })
		.withMessage('Weight must be a positive integer')
		.isIn([5, 10, 25, 35, 45, 100])
		.withMessage(
			'Weight must be one of the following values: 5, 10, 25, 35, 45, 100'
		),
	body('price')
		.trim()
		.notEmpty()
		.withMessage('Price is required')
		.isFloat({ min: 0, max: 999999.99 })
		.withMessage('Price must be between 0 and 999999.99'),
	body('quantity')
		.trim()
		.notEmpty()
		.withMessage('Quantity is required')
		.isInt({ min: 0, max: 999999 })
		.withMessage('Quantity must be between 0 and 999999'),
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
const validateId = [
	param('id').isInt({ min: 1, max: 999999 }).withMessage('Invalid ID'),
];

export {
	editWeightValidationRules,
	weightValidationRules,
	validateId,
	manufacturerValidationRules,
	materialValidationRules,
};
