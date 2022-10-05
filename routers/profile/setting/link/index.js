const express = require('express');
const {
	getAccessTokenInRequest,
	verifyAccessToken,
} = require('../../../../utils/jwt');
const router = express.Router();
const { pool } = require('../../../../utils/postgres');
const { linkCheck } = require('../../../../utils/profile/setting/link');

router.get('/', async (req, res) => {
	const link = req.query.link;
	const linkCheckResult = await linkCheck(link);

	return res.status(linkCheckResult.status).end();
});

router.patch('/', async (req, res) => {
	const link = req.body.link;
	const linkCheckResult = await linkCheck(link);
	if (linkCheckResult.status !== 200) {
		return res.status(linkCheckResult.status).end();
	}
	const { id } = verifyAccessToken(getAccessTokenInRequest(req));
	const patchLinkSql = 'UPDATE minfolink_user SET link = $1 where id = $2';

	try {
		await pool.query(patchLinkSql, [link, id]);
	} catch (error) {
		console.error('DB 패치 에러' + error);
		return res.status(500).end();
	}
	return res.status(200).end();
});

module.exports = router;
