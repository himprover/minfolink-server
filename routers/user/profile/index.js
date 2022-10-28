const express = require('express');
const router = express.Router();

router.use('/article', require('./article'));
router.use('/information', require('./information'));
router.use('/sns', require('./sns'));

module.exports = router;
