import { pool } from './pool.js';

// weights table queries
async function getAllWeights() {
	const { rows } = await pool.query(`
	SELECT 
		w.weight_id,
		w.weight,
		w.price,
		w.quantity,
		m.name AS manufacturer_name,
		mat.name AS material_name
	FROM 
    	weights w
	JOIN 
    	manufacturers m ON w.manufacturer_id = m.manufacturer_id
	JOIN 
    	materials mat ON w.material_id = mat.material_id
	ORDER BY weight;`);
	return rows;
}
async function getWeight(id) {
	const { rows } = await pool.query(
		`
	SELECT 
		w.weight_id,
		w.weight,
		w.price,
		w.quantity,
		m.name AS manufacturer_name,
		mat.name AS material_name
	FROM 
    	weights w
	JOIN 
    	manufacturers m ON w.manufacturer_id = m.manufacturer_id
	JOIN 
    	materials mat ON w.material_id = mat.material_id
	WHERE 
		w.weight_id = $1;`,
		[id]
	);
	return rows[0];
}
async function addWeight(weight) {
	await pool.query(
		'INSERT INTO weights (weight, price,quantity, material_id, manufacturer_id) VALUES ($1, $2, $3, $4, $5)',
		[
			weight.weight,
			weight.price,
			weight.quantity,
			weight.material_id,
			weight.manufacturer_id,
		]
	);
}
async function updateWeight(id, weight) {
	await pool.query(
		'UPDATE weights SET price = $1, quantity = $2  WHERE weight_id = $3',
		[weight.price, weight.quantity, id]
	);
}
async function deleteWeight(id) {
	await pool.query('DELETE FROM weights WHERE weight_id = $1', [id]);
}

// manufacturers table
async function getAllManufacturers() {
	const { rows } = await pool.query(
		'SELECT * FROM manufacturers ORDER BY name'
	);
	return rows;
}
async function addManufacturer(manufacturer) {
	await pool.query('INSERT INTO manufacturers (name) VALUES ($1)', [
		manufacturer.name,
	]);
}
async function getManufacturer(id) {
	const { rows } = await pool.query(
		'SELECT * FROM manufacturers WHERE manufacturer_id = $1',
		[id]
	);
	return rows[0];
}
async function updateManufacturer(id, manufacturer) {
	await pool.query(
		'UPDATE manufacturers SET name = $1 WHERE manufacturer_id = $2',
		[manufacturer.name, id]
	);
}
async function deleteManufacturer(id) {
	await pool.query('DELETE FROM manufacturers WHERE manufacturer_id = $1', [
		id,
	]);
}
// materials table
async function getAllMaterials() {
	const { rows } = await pool.query('SELECT * FROM materials ORDER BY name');
	return rows;
}
async function addMaterial(material) {
	await pool.query('INSERT INTO materials (name) VALUES ($1)', [material.name]);
}
async function getMaterial(id) {
	const { rows } = await pool.query(
		'SELECT * FROM materials WHERE material_id = $1',
		[id]
	);
	return rows[0];
}
async function updateMaterial(id, material) {
	await pool.query('UPDATE materials SET name = $1 WHERE material_id = $2', [
		material.name,
		id,
	]);
}
async function deleteMaterial(id) {
	await pool.query('DELETE FROM materials WHERE material_id = $1', [id]);
}

const weightQueries = {
	getAllWeights,
	getWeight,
	addWeight,
	updateWeight,
	deleteWeight,
};
const manufacturerQueries = {
	getAllManufacturers,
	addManufacturer,
	getManufacturer,
	updateManufacturer,
	deleteManufacturer,
};
const materialQueries = {
	getAllMaterials,
	addMaterial,
	getMaterial,
	updateMaterial,
	deleteMaterial,
};
export { weightQueries, manufacturerQueries, materialQueries };
