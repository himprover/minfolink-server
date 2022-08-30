const express = require('express');
const router = express.Router();

const { pool } = require('../../../utils/postgres');

router.get('/', async (req, res) => {
	const userLink = req.query.link;
	if (userLink === undefined || userLink === '') {
		return res.status(400).end();
	}

	try {
		const getUserIdSql = 'SELECT id from minfolink_user where link=$1';
		const { id } = (await pool.query(getUserIdSql, [userLink])).rows[0];

		const getSnsSql =
			'SELECT sequence, type, link from user_sns where id=$1 AND link IS NOT NULL ORDER BY sequence';
		const sns = (await pool.query(getSnsSql, [id])).rows;
		return res.status(200).json(sns).end();
	} catch (error) {
		return res.status(500).end();
	}
});

module.exports = router;
