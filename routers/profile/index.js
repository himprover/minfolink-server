const express = require('express');
const router = express.Router();
const { authCheck } = require('../../middlewares/authCheck');

router.use('/setting', authCheck, require('./setting'));
router.use('/sns', require('./sns'));

module.exports = router;
