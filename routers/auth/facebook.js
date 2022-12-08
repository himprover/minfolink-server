const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const { pool, isArrayEmpty, isValueEmpty } = require('../../utils/postgres');
const {
	createAccessToken,
	createRefreshToken,
	getAccessTokenInRequest,
	verifyAccessToken,
} = require('../../utils/jwt');

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_TEST_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_TEST_CLIENT_SECRET,
			callbackURL: '/auth/facebook/callback',
			profileFields: ['id', 'email', 'displayName', 'picture'],
		},
		async function (accessToken, refreshToken, profile, done) {
			// facebook 에서 로그인 후 실행되는 부분
			let user = {
				...profile._json,
				facebookAccessToken: accessToken,
				status: 1,
			};

			const checkUserInDbSql = `SELECT * FROM minfolink_user where id = $1::INT8`;
			const userInDb = (await pool.query(checkUserInDbSql, [user.id])).rows;

			// 만약 회원 없으면 status 0 으로 변경
			if (isArrayEmpty(userInDb)) {
				user.status = 0;
				done(null, user);
			}

			// 회원 있으면 jwt 생성해서 저장
			const jwtPayload = {
				id: userInfo.id,
				email: userInfo.email,
				name: userInfo.name,
			};
			user.accessToken = createAccessToken(jwtPayload);
			user.refreshToken = createRefreshToken(jwtPayload);

			done(null, user);
		}
	)
);

router.get(
	'/',
	passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

router.get(
	'/callback',
	passport.authenticate('facebook', {
		session: false,
	}),
	async (req, res) => {
		if (req.status === 1) {
			// 로그인 처리 페이지로 Redirect
			return res.redirect('http://localhost:3000/auth/signin?access');
		}

		// 회원가입 처리 페이지로 Redirect
		return res.redirect('http://localhost:3000/auth/signup?code=${}');
	}
);

module.exports = router;
