const express = require('express');
const router = express.Router();
const authUser = require('../middleware/auth-user');
// const authModOrCreator = require('../middleware/auth-mod-Creator');
const multer = require('../middleware/multer-config');
const reddit = require("../controllers/reddit-controller.js");


router.post("/", reddit.create); // Create a new Reddit post
// router.post("/",authUser,multer, reddit.create); // Create a new Reddit post
router.get("/", authUser,reddit.findAll); // Retrieve all Reddit post
router.get("/:id", authUser, reddit.findOne); // Retrieve a single Reddit post with id
// router.put("/:id", authModOrCreator, multer, reddit.update); // Update a Reddit post with id
// router.delete("/:id", authModOrCreator, multer,reddit.delete); // Delete aReddit post with id
// router.delete("/", authModOrCreator, multer, tutorials.deleteAll); // Delete all Tutorials => Not applicable

// manque la route vers les commentaires => mettre dans un autre fichier "routes"

module.exports = router;