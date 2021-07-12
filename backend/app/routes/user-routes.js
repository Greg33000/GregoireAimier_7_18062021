const express = require('express');
const router = express.Router();
const validPasswords = require('../middleware/valid-password');
const userCtrl = require('../controllers/user-controller');
const userAccount = require('../middleware/user-account');


router.post('/signup', validPasswords, userCtrl.signup); // s'enregistrer'
router.post('/signin', userCtrl.signin); // se connecter 
router.delete("/:id", userAccount, userCtrl.deleteUser); // Suppression de compte
router.get("/:id", userAccount, userCtrl.seeUser); // trouver un user

module.exports = router;