const express = require('express');
const router = express.Router();

router.use('/link', require('./link'));
router.use('/nickname', require('./nickname'));
router.use('/image', require('./image'));
router.use('/sns', require('./sns'));

module.exports = router;
