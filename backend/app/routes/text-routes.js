const express = require('express');
const router = express.Router();
const authUser = require('../middleware/auth-user');
// const authModOrCreator = require('../middleware/auth-mod-Creator');
const multer = require('../middleware/multer-config');
const redditCtrl = require("../controllers/text-controller.js");


router.post("/new", multer,redditCtrl.create); // Create a new Reddit post
// router.post("/new", authUser,multer, reddit.create); // Create a new Reddit post


router.get("/",redditCtrl.findAll); // Retrieve all Reddit post
// router.get("/", authUser,redditCtrl.findAll); // Retrieve all Reddit post
router.get("/:id", redditCtrl.findOne); // Retrieve a single Reddit post with id
// router.get("/:id", authUser, redditCtrl.findOne); // Retrieve a single Reddit post with id
// router.put("/:id", authModOrCreator, multer, reddit.update); // Update a Reddit post with id
// router.delete("/:id", authModOrCreator, multer,reddit.delete); // Delete aReddit post with id
// router.delete("/", authModOrCreator, multer, tutorials.deleteAll); // Delete all Tutorials => Not applicable

// manque la route vers les commentaires => mettre dans un autre fichier "routes"

module.exports = router;