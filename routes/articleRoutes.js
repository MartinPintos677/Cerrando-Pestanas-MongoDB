const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authenticateUser = require("../Auth/authenticateUser");

// Rutas relacionadas a los artículos:
router.get("/article", articleController.index);
router.get("/article/:id", articleController.show);
router.get("/article/list/:userId", articleController.getArticlesByUser);

// Rutas protegidas
router.use(authenticateUser);
router.post("/article", articleController.store);
router.patch("/article/:id", articleController.update);
router.delete("/article/:id", articleController.destroy);

module.exports = router;
