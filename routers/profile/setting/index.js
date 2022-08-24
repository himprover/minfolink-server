const express = require('express');
const router = express.Router();
const { pool, isArrayEmpty } = require('../../../utils/postgres');

/*
    3글자 이상, 30글자 이하
    영어, 숫자, '_' 만 허용
*/
const linkReg = /^[A-Za-z0-9_]{3,30}$/;

router.get('/link', async (req, res) => {
	const link = req.query.link;
	try {
		if (!linkReg.test(link)) {
			throw { status: 400, message: '올바르지 않은 규칙' };
		}
		const getLinkSql = 'SELECT * FROM minfolink_user where link = $1';

		let dbLink;
		try {
			dbLink = (await pool.query(getLinkSql, [link])).rows;
		} catch (error) {
			throw { status: 500, message: 'DB 조회 에러' + error };
		}

		// 유저 DB 조회 결과가 있으면 중복
		if (!isArrayEmpty(dbLink)) {
			throw { status: 409, message: '중복된 링크' };
		}

		return res.status(200).end();
	} catch (error) {
		console.error('링크 확인 오류발생 - ', error.status, error.message);
		return res.status(error.status).end();
	}
});

module.exports = router;
