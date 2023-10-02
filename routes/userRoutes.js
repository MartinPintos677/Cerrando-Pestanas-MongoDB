const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUser = require("../Auth/authenticateUser");

// Rutas relacionadas a los usuarios:

router.post("/login", userController.login);

// Middleware de autenticación para las rutas protegidas
router.use(authenticateUser);
router.get("/user", userController.index);
router.get("/user/:username", userController.show);
router.post("/user", userController.store);
router.patch("/user/:username", userController.update);
router.delete("/user/:username", userController.destroy);
router.get("/logout", userController.logout);

module.exports = router;
