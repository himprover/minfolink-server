const express = require('express');
const router = express.Router();

const {
	getAccessTokenInRequest,
	verifyAccessToken,
} = require('../../../../utils/jwt');
const { pool } = require('../../../../utils/postgres');

const SNS_TYPE_LIST = [
	'instagram',
	'facebook',
	'youtube',
	'twitch',
	'twitter',
	'kakaotalk',
];
const URL_REG =
	/^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;

router.put('/', async (req, res) => {
	const snsType = req.body.type;
	const snsLink = req.body.link;
	const snsSequence = req.body.sequence;

	if (
		snsType === undefined ||
		SNS_TYPE_LIST.findIndex((value) => value === snsType) === -1
	) {
		console.log('SNS 링크 변경, TYPE 오류');
		return res.status(400).json({ errorCode: 400001 }).end();
	}

	if (snsLink === undefined || snsLink === '' || !URL_REG.test(snsLink)) {
		console.log('SNS 링크 변경, LINK 오류');
		return res.status(400).json({ errorCode: 400002 }).end();
	}

	if (snsSequence === undefined || snsSequence > 5 || snsSequence < 1) {
		console.log('SNS 링크 변경, SEQUENCE 오류');
		return res.status(400).json({ errorCode: 400003 }).end();
	}

	const { id } = verifyAccessToken(getAccessTokenInRequest(req));
	try {
		const putSql =
			'INSERT INTO user_sns (id, sequence, type, link) VALUES ($1, $2, $3, $4) ON CONFLICT (id, sequence) DO UPDATE SET type=$3, link=$4';
		await pool.query(putSql, [id, snsSequence, snsType, snsLink]);
		return res.status(201).end();
	} catch (error) {
		console.log('SNS 링크 변경, DB 오류 ' + error);
		return res.status(500).end();
	}
});

router.delete('/', async (req, res) => {
	const snsSequence = req.query.sequence;
	if (snsSequence === undefined || snsSequence > 5 || snsSequence < 1) {
		console.log('SNS 링크 삭제, SEQUENCE 오류');
		return res.status(400).json({ errorCode: 10000 }).end();
	}

	const { id } = verifyAccessToken(getAccessTokenInRequest(req));
	try {
		const putSql = 'UPDATE user_sns SET link=NULL WHERE id=$1 AND sequence=$2';
		await pool.query(putSql, [id, snsSequence]);
		return res.status(204).end();
	} catch (error) {
		console.log('SNS 링크 변경, DB 오류 ' + error);
		return res.status(500).end();
	}
});

module.exports = router;
