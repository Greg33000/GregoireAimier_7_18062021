const express = require('express');
const router = express.Router();
const authUser = require('../middleware/auth-user');
const authModerator = require('../middleware/auth-moderator');
const textCommentsCtrl = require("../controllers/textcomment-controller.js");

router.post("/new", authUser, textCommentsCtrl.createComment); // Create a new comment
router.get("/:postId",authUser, textCommentsCtrl.findAllComments); // get all comments with text id
router.delete("/:id", authModerator, textCommentsCtrl.deleteComment); // Delete a comment with text id (moderator)
router.put("/:id", authModerator, textCommentsCtrl.updateComment); // modify a comment with text id (moderator)

module.exports = router;