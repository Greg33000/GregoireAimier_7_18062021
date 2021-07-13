const express = require('express');
const router = express.Router();
const validPasswords = require('../middleware/valid-password');
const userCtrl = require('../controllers/user-controller');
const userAccount = require('../middleware/user-account');


router.post('/signup', validPasswords, userCtrl.signup); // route to signup
router.post('/signin', userCtrl.signin); // route to login
router.delete("/:id", userAccount, userCtrl.deleteUser); // Deletion of user account
router.get("/:id", userAccount, userCtrl.seeUser); // find a user

module.exports = router;