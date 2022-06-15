const { Client } = require('pg');
const Query = require('pg').Query;

const client = new Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

client.connect((err) => {
	if (err) {
		console.error('error', err.stack);
	} else {
		console.log('success');
	}
});

module.exports = { client, Query };
