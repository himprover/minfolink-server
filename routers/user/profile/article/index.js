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

		const getArticleSql =
			'SELECT id, category, title, description, link, font_color as "fontColor", background_color as "backgroundColor", background_image as "backgroundImage", sequence from user_article where user_id=$1 AND disabled_at IS NULL AND deleted_at IS NULL ORDER BY sequence';
		const article = (await pool.query(getArticleSql, [id])).rows;
		return res.status(200).json({ articles: article }).end();
	} catch (error) {
		console.log('user/profile/article ', error);
		return res.status(500).end();
	}
});

module.exports = router;
