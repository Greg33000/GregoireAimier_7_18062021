const express = require('express');
const router = express.Router();
const authUser = require('../middleware/auth-user');
const authModerator = require('../middleware/auth-moderator');
const textCommentsCtrl = require("../controllers/textcomment-controller.js");

router.post("/new", authUser, textCommentsCtrl.createComment); // Créer un nouveau commentaire
router.get("/:postId",authUser, textCommentsCtrl.findAllComments); // Retrouver tous les commentaires pour un id donné
router.delete("/:id", authModerator, textCommentsCtrl.deleteComment); // supprimer un commentaire pour un id donné (moderateur)
router.put("/:id", authModerator, textCommentsCtrl.updateComment); // modifier un commentaire pour un id donné (moderateur)

module.exports = router;