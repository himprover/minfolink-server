const express = require('express');
const router = express.Router();

const setting = require('./setting');

router.use('/setting', setting);

module.exports = router;
