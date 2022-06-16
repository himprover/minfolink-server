const { Pool } = require('pg');

const config = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
};

const pool = new Pool(config);

const isArrayEmpty = (array) => {
	if (Array.isArray(array) && array.length === 0) {
		return true;
	}
	return false;
};

module.exports = { pool, isArrayEmpty };
