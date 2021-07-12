const express = require('express');
const router = express.Router();
const authUser = require('../middleware/auth-user');
const authModerator = require('../middleware/auth-moderator');
const multer = require('../middleware/multer-config');
const textCtrl = require("../controllers/text-controller.js");

router.post("/new", authUser,multer, textCtrl.create); // Créer un nouveau post
router.get("/", authUser, textCtrl.findAll); // Récupérer tous les posts (avec ou sans paramètres de recherches : title et username)
router.get("/:id", authUser, textCtrl.findOne); // Récupérer un post avec un id donné
router.delete("/:id", authModerator, textCtrl.deleteText); // supprimer un post pour un id donné (moderateur)
router.put("/:id", authModerator, multer, textCtrl.updateText); // modifier un post pour un id donné (moderateur)

module.exports = router;