const express = require('express');
const {
	getAccessTokenInRequest,
	verifyAccessToken,
} = require('../../../utils/jwt');
const router = express.Router();
const { pool } = require('../../../utils/postgres');
const { linkCheck } = require('../../../utils/profile/setting/link');
const { nicknameCheck } = require('../../../utils/profile/setting/nickname');

router.get('/link', async (req, res) => {
	const link = req.query.link;
	const linkCheckResult = await linkCheck(link);

	return res.status(linkCheckResult.status).end();
});

router.patch('/link', async (req, res) => {
	const link = req.body.link;
	const linkCheckResult = await linkCheck(link);
	if (linkCheckResult.status !== 200) {
		return res.status(linkCheckResult.status).end();
	}
	const { id } = verifyAccessToken(getAccessTokenInRequest(req));
	const patchLinkSql = 'UPDATE minfolink_user SET link = $1 where id = $2';

	try {
		const sql = await pool.query(patchLinkSql, [link, id]);
	} catch (error) {
		return { status: 500, message: 'DB 패치 에러' + error };
	}
	return res.status(200).end();
});

router.patch('/nickname', async (req, res) => {
	const nickname = req.body.nickname;
	const nicknameCheckResult = nicknameCheck(nickname);
	if (nicknameCheckResult.status !== 200) {
		return res.status(nicknameCheckResult.status).end();
	}
	const { id } = verifyAccessToken(getAccessTokenInRequest(req));
	const patchNicknameSql =
		'UPDATE minfolink_user SET nickname = $1 where id = $2';

	try {
		const sql = await pool.query(patchNicknameSql, [nickname, id]);
	} catch (error) {
		return { status: 500, message: 'DB 패치 에러' + error };
	}
	return res.status(200).end();
});

module.exports = router;
