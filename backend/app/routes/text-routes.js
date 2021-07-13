const express = require('express');
const router = express.Router();
const authUser = require('../middleware/auth-user');
const authModerator = require('../middleware/auth-moderator');
const multer = require('../middleware/multer-config');
const textCtrl = require("../controllers/text-controller.js");

router.post("/new", authUser,multer, textCtrl.create); // Create a new Text
router.get("/", authUser, textCtrl.findAll); // Find all texts = articles (with or without parameters : research on title and username)
router.get("/:id", authUser, textCtrl.findOne); // Find one text with id
router.delete("/:id", authModerator, textCtrl.deleteText); // Delete a Text with id (moderator)
router.put("/:id", authModerator, multer, textCtrl.updateText); // Modify a Text with id (moderator)

module.exports = router;