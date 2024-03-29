const express = require('express');
const { authCheck } = require('../middlewares/authCheck');
const router = express.Router();

const auth = require('./auth');
const user = require('./user');
const profile = require('./profile');

router.use('/auth', auth);
router.use('/user', user);

// router.use('/user', authCheck, user);
router.use('/profile', profile);

module.exports = router;
