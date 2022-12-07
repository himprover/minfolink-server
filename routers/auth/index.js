const express = require('express');
const router = express.Router();

router.use('/facebook', require('./facebook'));

module.exports = router;
