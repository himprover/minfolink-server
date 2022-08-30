const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
	getAccessTokenInRequest,
	verifyAccessToken,
} = require('../../../../utils/jwt');
const { pool } = require('../../../../utils/postgres');
const { s3_storage } = require('../../../../utils/s3');

const uploadProfileImageFilter = (req, file, cb) => {
	const type = file.mimetype.split('/')[1];
	switch (type) {
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'gif':
			req.fileValidateError = false;
			cb(null, true);
			break;
		default:
			req.fileValidateError = true;
			cb(null, false);
	}
};

const s3_upload = multer({
	storage: s3_storage('user/profile/image/'),
	fileFilter: uploadProfileImageFilter,
	limits: { fileSize: 10 * 1024 * 1024 },
});

const upload_profile_s3 = s3_upload.fields([{ name: 'image', maxCount: 1 }]);

router.patch('/', upload_profile_s3, async (req, res) => {
	if (req.fileValidateError) {
		return res.status(400).end();
	}

	const { id } = verifyAccessToken(getAccessTokenInRequest(req));

	const newImageUrl = req.files['image'][0].location;
	const patchImageSql =
		'UPDATE minfolink_user SET profile_image = $1 where id = $2';

	try {
		await pool.query(patchImageSql, [newImageUrl, id]);
	} catch (error) {
		return { status: 500, message: 'DB 패치 에러' + error };
	}

	return res.status(200).end();
});

module.exports = router;
