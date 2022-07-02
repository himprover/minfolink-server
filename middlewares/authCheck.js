const { verifyAccessToken, getAccessTokenInRequest } = require('../utils/jwt');

const authCheck = async (req, res, next) => {
	const accessToken = getAccessTokenInRequest(req);
	const verifiedAccessToken = verifyAccessToken(accessToken);
	if (!accessToken || !verifiedAccessToken.ok) {
		console.log('미들웨어 - 인증 헤더 오류');
		return res.status(401).end();
	}

	return next();
};

module.exports = {
	authCheck,
};
