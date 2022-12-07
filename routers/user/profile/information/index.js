const express = require('express');
const { pool, isArrayEmpty } = require('@utils/postgres');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		if (req.query.link === '' || req.query.link === undefined) {
			throw { status: 400, message: '잘못된 link request' };
		}

		const getUserSql =
			'SELECT id, email, link, nickname, profile_image AS "profileImage", is_enabled AS "isEnabled", background_color AS "backgroundColor", background_image AS "backgroundImage" FROM minfolink_user where link = $1 AND deleted_at IS NULL AND is_enabled=true';

		let dbUser;
		try {
			dbUser = (await pool.query(getUserSql, [req.query.link])).rows;
		} catch (error) {
			throw { status: 500, message: 'DB 회원정보 조회 에러' + error };
		}

		// 유저 DB 조회 결과가 없으면 회원이 아님
		if (isArrayEmpty(dbUser)) {
			throw { status: 404, message: '회원 정보가 없음' };
		}

		return res.status(200).json(dbUser[0]).end();
	} catch (error) {
		console.error('user/profile/information - ', error.status, error.message);
		return res.status(error.status).end();
	}
});

module.exports = router;
