const aws = require('aws-sdk');
const multer_s3 = require('multer-s3');
const iconv = require('iconv-lite');

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const s3_storage = (src) =>
	multer_s3({
		s3: s3,
		bucket: 'minfolink',
		contentType: multer_s3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		metadata: function (req, file, cb) {
			if (file.mimetype) cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			file.originalname = iconv.decode(file.originalname, 'utf-8');
			cb(null, `${src}${Date.now()}_${file.originalname}`);
		},
	});

module.exports = { s3_storage };
