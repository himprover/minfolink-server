const express = require('express');
const router = express.Router();
const axios = require('axios');
const { pool, isArrayEmpty, isValueEmpty } = require('../../utils/postgres');
const { getAccessToken, getRefreshToken } = require('../../utils/jwt');

router.post('/signin/', async (req, res, next) => {
	// accessToken 전달받음
	const oAuthAccessToken = req.body.accessToken;

	try {
		// accessToken으로 resource server에 요청해 리소스 전달받음
		const { data } = await axios({
			method: 'get',
			url: `https://graph.facebook.com/v14.0/me?fields=id%2Cname%2Cemail&access_token=${oAuthAccessToken}`,
		});

		console.log(data);

		const checkUserSql = 'SELECT * FROM minfolink_user where id = $1';
		const { rows } = await pool.query(checkUserSql, [data.id]);

		// 유저 DB 조회 결과가 없으면 회원이 아님
		if (isArrayEmpty(rows)) {
			res.status(403).end();
			next();
		} else {
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
				.json({ accessToken: accessToken, refreshToken: refreshToken })
				.end();
			next();
		}
	} catch (error) {
		// 전달받은 토큰 자체가 문제, 리소스를 얻지 못해 로그인 처리 불가
		console.error('accessTokenError', error);
		res.status(401).end();
		next();
	}
});

router.post('/signup/', async (req, res, next) => {
	const oAuthAccessToken = req.body.accessToken;
	const { link } = req.body;
	const { nickname } = req.body;
	const { profileImage } = req.body;
	const { terms } = req.body;
	const { privacy } = req.body;
	const { marketing } = req.body;

	if (
		isValueEmpty(link) ||
		isValueEmpty(nickname) ||
		isValueEmpty(profileImage) ||
		isValueEmpty(terms) ||
		isValueEmpty(privacy) ||
		isValueEmpty(marketing)
	) {
		res.status(400).end();
		next();
	}

	try {
		const { data } = await axios({
			method: 'get',
			url: `https://graph.facebook.com/v14.0/me?fields=id%2Cname%2Cemail&access_token=${oAuthAccessToken}`,
		});

		const checkUserSql = 'SELECT * FROM minfolink_user where id = $1';
		const { rows } = await pool.query(checkUserSql, [data.id]);
		// 유저 DB 조회 결과가 있으면 회원가입 불가
		if (!isArrayEmpty(rows)) {
			res.status(409).end();
			next();
		}

		const insertUser = [
			data.id,
			data.email,
			link,
			nickname,
			profileImage,
			true,
			terms,
			privacy,
			marketing,
		];
		const insertUserSql =
			'INSERT INTO minfolink_user(id,email,link,nickname,profile_image,is_enabled,created_at,updated_at,terms,privacy,marketing)' +
			'VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp, $7, $8, $9)';
		const insertResult = await pool.query(insertUserSql, insertUser);

		res.status(200).end();
		next();
	} catch (error) {
		// 전달받은 토큰 자체가 문제, 리소스를 얻지 못해 로그인 처리 불가
		console.error('accessTokenError', error);
		res.status(401).end();
		next();
	}
});

module.exports = router;
