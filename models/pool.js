import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DEV_DB_URL });

export { pool };
