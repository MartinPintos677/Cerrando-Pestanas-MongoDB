const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentController");
const authenticateUser = require("../Auth/authenticateUser");

// Rutas relacionadas a los comentarios:
router.post("/comment", commentsController.store);
router.get("/comment/list/:articleId", commentsController.getCommentsByArticle);
router.get("/comment", commentsController.index);
router.get("/comment/:id", commentsController.show);

router.use(authenticateUser);
//router.patch("/comment/:id", commentsController.update);
router.delete("/comment/:id", commentsController.destroy);

module.exports = router;
