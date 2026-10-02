#! /usr/bin/env node

import { Client } from 'pg';

const SQL = `
CREATE TABLE IF NOT EXISTS manufacturers (
manufacturer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS materials (
material_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(50) NOT NULL);

CREATE TABLE IF NOT EXISTS weights (
weight_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
weight INTEGER NOT NULL,
price DECIMAL(10,2) NOT NULL,
quantity INTEGER DEFAULT 0,
material_id INTEGER NOT NULL,
manufacturer_id INTEGER NOT NULL,
FOREIGN KEY (manufacturer_id) 
REFERENCES manufacturers(manufacturer_id) ON DELETE CASCADE,
FOREIGN KEY (material_id)
REFERENCES materials(material_id));


INSERT INTO manufacturers (name) VALUES 
('IronGrip Athletics'),
('Titan Fitness Corp'),
('Olympic Gear');

INSERT INTO materials (name) VALUES 
('Cast Iron'),
('Rubber Coated'),
('Urethane');

INSERT INTO weights (weight, price, quantity, material_id, manufacturer_id) VALUES 
(45, 89.99, 10, 1, 1), 
(25, 54.50, 15, 2, 1),  
(45, 119.99, 5, 3, 2), 
(10, 22.00, 20, 1, 3);  
`;

async function main() {
	console.log('Seeding db...');
	const client = new Client({
		connectionString: process.argv[2],
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('Seeding Complete.');
}

main();
