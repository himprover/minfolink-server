const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = {
	// accessToken 발급
	getAccessToken: (user) => {
		const payload = {
			id: user.id,
			role: user.role,
		};

		return jwt.sign(payload, secret, {
			algorithm: 'HS256', // 암호화 알고리즘
			expiresIn: '2h', // 유효기간
		});
	},
	// accessToken 검증
	verifyAccessToken: (token) => {
		let decoded = null;
		try {
			decoded = jwt.verify(token, secret);
			return {
				ok: true,
				id: decoded.id,
				role: decoded.role,
			};
		} catch (err) {
			return {
				ok: false,
				message: err.message,
			};
		}
	},
	// refreshToken 발급
	getRefreshToken: () => {
		return jwt.sign({}, secret, {
			// refresh token은 payload 없이 발급
			algorithm: 'HS256',
			expiresIn: '14d',
		});
	},
	//refreshToken 검증
	verifyRefreshToken: async (token, userId) => {
		// userId로 DB의 refreshToken 을 불러와서 검증하는 게 필요할 듯 ?
		try {
			if (token === data) {
				try {
					jwt.verify(token, secret);
					return true;
				} catch (err) {
					return false;
				}
			} else {
				return false;
			}
		} catch (err) {
			return false;
		}
	},
};
