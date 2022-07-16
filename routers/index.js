const express = require('express');
const { authCheck } = require('../middlewares/authCheck');
const router = express.Router();

const auth = require('./auth');
const user = require('./user');

router.use('/auth', auth);
router.use('/user', authCheck, user);

module.exports = router;
