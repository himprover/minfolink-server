const passport = require('passport');

passport.serializeUser(async (user, done) => {
	console.log('serializeUser : ', user);
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	console.log('deserializeUser : ', id);
	return done(null, user);
});
