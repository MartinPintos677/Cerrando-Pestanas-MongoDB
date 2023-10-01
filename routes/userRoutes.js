const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas relacionadas a los usuarios:

router.get("/user", userController.index);
router.get("/user/:username", userController.show);
router.post("/user", userController.store);
router.patch("/user/:username", userController.update);
router.delete("/user/:username", userController.destroy);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
