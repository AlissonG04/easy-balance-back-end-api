const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/registro", userController.registrarUsuario);

// Em breve: GET /, PUT /:id, DELETE /:id

module.exports = router;
