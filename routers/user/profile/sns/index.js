const express = require('express');
const router = express.Router();

const { pool } = require('@utils/postgres');

router.get('/', async (req, res) => {
	const userLink = req.query.link;
	if (userLink === undefined || userLink === '') {
		return res.status(400).end();
	}

	try {
		const getUserIdSql =
			'SELECT id from minfolink_user where link=$1 AND is_enabled = true';
		const { id } = (await pool.query(getUserIdSql, [userLink])).rows[0];

		const getSnsSql =
			'SELECT sequence, type, link from user_sns where user_id=$1 AND link IS NOT NULL ORDER BY sequence';
		const sns = (await pool.query(getSnsSql, [id])).rows;
		return res.status(200).json({ sns: sns }).end();
	} catch (error) {
		console.log('user/profile/sns ', error);
		return res.status(500).end();
	}
});

module.exports = router;
