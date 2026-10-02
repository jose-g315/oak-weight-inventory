import { pool } from './pool.js';

// weights table queries
async function getAllWeights() {
	const { rows } = await pool.query('SELECT * FROM weights');
	return rows;
}
async function getWeight(id) {
	const { rows } = await pool.query('SELECT * FROM weights WHERE id = $1', [
		id,
	]);
	return rows[0];
}
async function addWeight(weight) {
	await pool.query(
		'INSERT INTO weights (weight, price, material_id, manufacturer_id) VALUES ($1, $2, $3, $4)',
		[weight.weight, weight.price, weight.material, weight.manufacturer]
	);
}
async function updateWeight() {}
async function deleteWeight() {}

export { getAllWeights, getWeight, addWeight, updateWeight, deleteWeight };
