const express = require('express');
const router = express.Router();
const axios = require('axios');
const { pool, isArrayEmpty, isValueEmpty } = require('../../utils/postgres');
const { getAccessToken, getRefreshToken } = require('../../utils/jwt');

router.post('/signin/', async (req, res) => {
	// accessToken 전달받음
	const oAuthAccessToken = req.body.accessToken;

	try {
		// accessToken으로 resource server에 요청해 리소스 전달받음
		let userInfo;
		try {
			userInfo = (
				await axios({
					method: 'get',
					url: `https://graph.facebook.com/v14.0/me?fields=id%2Cname%2Cemail&access_token=${oAuthAccessToken}`,
				})
			).data;
		} catch (error) {
			throw { status: 401, message: 'oAuthAccessToken 문제' };
		}

		console.log(userInfo);

		const checkUserSql = 'SELECT * FROM minfolink_user where id = $1';

		let dbUser;
		try {
			dbUser = (await pool.query(checkUserSql, [userInfo.id])).rows;
		} catch (error) {
			throw { status: 500, message: 'DB 회원정보 조회 에러' };
		}

		// 유저 DB 조회 결과가 없으면 회원이 아님
		if (isArrayEmpty(dbUser)) {
			throw { status: 403, message: '회원가입 정보가 없음' };
		} else {
			// 토큰 생성
			const jwtPayload = {
				id: userInfo.id,
				email: userInfo.email,
				name: userInfo.name,
			};
			const accessToken = getAccessToken(jwtPayload);
			const refreshToken = getRefreshToken(jwtPayload);

			const insertRefreshTokenSql =
				'UPDATE minfolink_user SET refresh_token = $1 where id = $2';

			try {
				await pool.query(insertRefreshTokenSql, [refreshToken, userInfo.id]);
			} catch (error) {
				throw { status: 500, message: 'DB refreshToken insert 에러' };
			}

			res
				.status(200)
				.json({ accessToken: accessToken, refreshToken: refreshToken })
				.end();
			return;
		}
	} catch (error) {
		console.error('로그인 오류발생 - ', error.status, error.message);
		res.status(error.status).end();
		return;
	}
});

router.post('/signup/', async (req, res) => {
	const oAuthAccessToken = req.body.accessToken;
	const { link } = req.body;
	const { nickname } = req.body;
	const { profileImage } = req.body;
	const { terms } = req.body;
	const { privacy } = req.body;
	const { marketing } = req.body;

	try {
		let userInfo;
		try {
			userInfo = (
				await axios({
					method: 'get',
					url: `https://graph.facebook.com/v14.0/me?fields=id%2Cname%2Cemail&access_token=${oAuthAccessToken}`,
				})
			).data;
		} catch (error) {
			throw { status: 401, message: '올바르지 않은 oAuthAccesToken' };
		}

		let dbUser;
		const checkUserSql = 'SELECT * FROM minfolink_user where id = $1';
		try {
			dbUser = (await pool.query(checkUserSql, [userInfo.id])).rows;
		} catch (error) {
			throw { status: 500, message: 'DB 회원정보 조회 에러' };
		}

		// 유저 DB 조회 결과가 있으면 회원가입 불가
		if (!isArrayEmpty(dbUser)) {
			throw { status: 409, message: '이미 가입되어 있는 회원' };
		}

		if (
			isValueEmpty(link) ||
			isValueEmpty(nickname) ||
			isValueEmpty(profileImage) ||
			isValueEmpty(terms) ||
			isValueEmpty(privacy) ||
			isValueEmpty(marketing)
		) {
			throw { status: 400, message: '올바르지 않은 회원가입 정보' };
		}

		const insertUser = [
			userInfo.id,
			userInfo.email,
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
		try {
			await pool.query(insertUserSql, insertUser);
		} catch (error) {
			throw { status: 500, message: 'DB 회원정보 insert 에러' };
		}

		res.status(200).end();
		return;
	} catch (error) {
		console.error('회원가입 오류발생 - ', error.status, error.message);
		res.status(error.status).end();
		return;
	}
});

module.exports = router;
