const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/registro", userController.registrarUsuario);
router.get("/", userController.buscarUsuarios);
router.put("/:id", userController.atualizarUsuario);
router.delete("/:id", userController.deletarUsuario);

// Em breve: GET /, PUT /:id, DELETE /:id

module.exports = router;
