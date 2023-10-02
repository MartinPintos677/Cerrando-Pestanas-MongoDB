const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Rutas relacionadas a los artículos:

router.get("/article", articleController.index);
router.get("/article/:id", articleController.show);
router.post("/article", articleController.store);
router.patch("/article/:id", articleController.update);
router.delete("/article/:id", articleController.destroy);
router.get("/article/list/:userId", articleController.getArticlesByUser);

module.exports = router;
