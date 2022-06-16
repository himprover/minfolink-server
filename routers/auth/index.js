const express = require('express');
const router = express.Router();
const axios = require('axios');
const { pool, isArrayEmpty } = require('../../utils/postgres');
const { getAccessToken, getRefreshToken } = require('../../utils/jwt');

router.post('/signin/', async (req, res) => {
	// accessToken 전달받음
	const oAuthAccessToken = req.body.accessToken;
	try {
		// accessToken으로 resource server에 요청해 리소스 전달받음
		const { data } = await axios({
			method: 'get',
			url: `https://graph.facebook.com/v14.0/me?fields=id%2Cname%2Cemail&access_token=${oAuthAccessToken}`,
		});

		console.log(data);

		const sql = 'SELECT * FROM minfolink_user where id = $1';
		const { rows } = await pool.query(sql, [data.id]);

		// 유저 DB 조회 결과가 없으면 회원이 아님
		if (isArrayEmpty(rows)) {
			res.status(403);
		}

		// 토큰 생성
		const jwtPayload = {
			id: data.id,
			email: data.email,
			name: data.name,
		};
		const accessToken = getAccessToken(jwtPayload);
		const refreshToken = getRefreshToken(jwtPayload);

		const insertRefreshTokenSql =
			'UPDATE minfolink_user SET refresh_token = $1 where id = $2';
		await pool.query(insertRefreshTokenSql, [refreshToken, data.id]);

		res
			.status(200)
			.json({ accessToken: accessToken, refreshToken: refreshToken });
	} catch (error) {
		// 전달받은 토큰 자체가 문제, 리소스를 얻지 못해 로그인 처리 불가
		console.error('accessTokenError', error);
		res.status(401);
	}
});

module.exports = router;
