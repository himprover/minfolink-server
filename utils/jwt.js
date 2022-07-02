const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { pool } = require('./postgres');
const { isArrayEmpty } = require('./postgres');

module.exports = {
	// accessToken 발급
	getAccessToken: (user) => {
		const payload = {
			id: user.id,
			email: user.email,
			name: user.name,
		};

		return jwt.sign(payload, secret, {
			algorithm: 'HS256', // 암호화 알고리즘
			expiresIn: '2h', // 유효기간
		});
	},
	// accessToken 검증
	verifyAccessToken: (token) => {
		try {
			const decoded = jwt.verify(token, secret);
			return {
				ok: true,
				id: decoded.id,
				email: decoded.email,
				name: decoded.name,
			};
		} catch (err) {
			return {
				ok: false,
				message: err.message,
			};
		}
	},
	// refreshToken 발급
	getRefreshToken: (user) => {
		const payload = {
			id: user.id,
		};
		return jwt.sign(payload, secret, {
			// refresh token은 payload 없이 발급
			algorithm: 'HS256',
			expiresIn: '14d',
		});
	},
	//refreshToken 검증
	verifyRefreshToken: async (token) => {
		try {
			const decoded = jwt.verify(token, secret);
			const sql =
				'SELECT * FROM minfolink_user WHERE id = $1 AND refresh_token= $2';
			const { rows } = await pool.query(sql, [decoded.id, token]);

			// DB에 없으면 false
			if (isArrayEmpty(rows)) {
				return false;
			}
			return true;
		} catch (err) {
			return false;
		}
	},
};
