const express = require('express');
const router = express.Router();
const authUser = require('../middleware/auth-user');
const authModerator = require('../middleware/auth-moderator');
const multer = require('../middleware/multer-config');
const textCtrl = require("../controllers/text-controller.js");


// router.post("/new", multer,redditCtrl.create); // Create a new Reddit post
router.post("/new", authUser,multer, textCtrl.create); // Create a new Reddit post


// router.get("/",redditCtrl.findAll); // Retrieve all Reddit post
router.get("/", authUser, textCtrl.findAll); // Retrieve all Reddit post
// router.get("/:id", redditCtrl.findOne); // Retrieve a single Reddit post with id
router.get("/:id", authUser, textCtrl.findOne); // Retrieve a single Reddit post with id
// router.put("/:id", authModOrCreator, multer, reddit.update); // Update a Reddit post with id
// router.delete("/:id", authModOrCreator, multer,reddit.delete); // Delete aReddit post with id
// router.delete("/", authModOrCreator, multer, tutorials.deleteAll); // Delete all Tutorials => Not applicable

// manque la route vers les commentaires => mettre dans un autre fichier "routes"


router.delete("/:id", authModerator, textCtrl.deleteText); // supprimer un article pour un id donné (moderateur)
router.put("/:id", authModerator, multer, textCtrl.updateText); // modifier un article pour un id donné (moderateur)

module.exports = router;