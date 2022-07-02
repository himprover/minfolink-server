const express = require('express');
const {
	getAccessTokenInRequest,
	verifyAccessToken,
} = require('../../utils/jwt');
const { pool, isArrayEmpty } = require('../../utils/postgres');

const router = express.Router();

router.get('/', async (req, res) => {
	const verifiedAccessToken = verifyAccessToken(getAccessTokenInRequest(req));
	console.log(verifiedAccessToken);
	try {
		const getUserSql = 'SELECT * FROM minfolink_user where id = $1::INT8';

		let dbUser;
		try {
			dbUser = (await pool.query(getUserSql, [verifiedAccessToken.id])).rows;
		} catch (error) {
			throw { status: 500, message: 'DB 회원정보 조회 에러' + error };
		}

		// 유저 DB 조회 결과가 없으면 회원이 아님
		if (isArrayEmpty(dbUser)) {
			throw { status: 401, message: '회원가입 정보가 없음' };
		}

		return res.status(200).json(dbUser[0]).end();
	} catch (error) {
		console.error('인증헤더 오류발생 - ', error.status, error.message);
		return res.status(error.status).end();
	}
});

module.exports = router;
