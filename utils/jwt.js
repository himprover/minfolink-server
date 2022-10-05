const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { pool } = require('./postgres');
const { isArrayEmpty } = require('./postgres');

const createAccessToken = (user) => {
	const payload = {
		id: user.id,
		email: user.email,
		name: user.name,
	};

	return jwt.sign(payload, secret, {
		algorithm: 'HS256', // 암호화 알고리즘
		expiresIn: '2h', // 유효기간
	});
};

const verifyAccessToken = (token) => {
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
};

const createRefreshToken = (user) => {
	const payload = {
		id: user.id,
	};
	return jwt.sign(payload, secret, {
		// refresh token은 payload 없이 발급
		algorithm: 'HS256',
		expiresIn: '14d',
	});
};

const verifyRefreshToken = async (token) => {
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
};

const getAccessTokenInRequest = (req) => {
	if (!req.headers.authorization) {
		return '';
	}

	return req.headers.authorization.split('Bearer ')[1];
};

module.exports = {
	createAccessToken,
	verifyAccessToken,
	createRefreshToken,
	verifyRefreshToken,
	getAccessTokenInRequest,
};
