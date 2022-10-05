const express = require('express');
const {
	getAccessTokenInRequest,
	verifyAccessToken,
} = require('../../../../utils/jwt');
const router = express.Router();
const { pool } = require('../../../../utils/postgres');
const { nicknameCheck } = require('../../../../utils/profile/setting/nickname');

router.patch('/', async (req, res) => {
	const nickname = req.body.nickname;
	const nicknameCheckResult = nicknameCheck(nickname);
	if (nicknameCheckResult.status !== 200) {
		return res.status(nicknameCheckResult.status).end();
	}
	const { id } = verifyAccessToken(getAccessTokenInRequest(req));
	const patchNicknameSql =
		'UPDATE minfolink_user SET nickname = $1 where id = $2';

	try {
		await pool.query(patchNicknameSql, [nickname, id]);
	} catch (error) {
		console.error('DB 패치 에러' + error);
		return res.status(500).end();
	}
	return res.status(200).end();
});

module.exports = router;
