const express = require('express');
const router = express.Router();
const validPasswords = require('../middleware/valid-password');

const userCtrl = require('../controllers/user-controller');

router.post('/signup', userCtrl.signup);
// router.post('/signup', validPasswords, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;