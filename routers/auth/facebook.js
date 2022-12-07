const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_TEST_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_TEST_CLIENT_SECRET,
			callbackURL: '/auth/facebook/callback',
			profileFields: ['id', 'email', 'name'],
		},
		async function (accessToken, refreshToken, profile, done) {
			// facebook 에서 로그인 후 실행되는 부분
			const user = profile;
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
		successRedirect: 'http://localhost:3000/auth/signIn',
		failureRedirect: '/auth/error',
	})
);

module.exports = router;
