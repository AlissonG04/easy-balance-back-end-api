const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  autenticarToken,
  autorizarAdmin,
} = require("../middlewares/auth.middleware");

router.post(
  "/registro",
  autenticarToken,
  autorizarAdmin,
  userController.registrarUsuario
);

router.get("/", autenticarToken, autorizarAdmin, userController.buscarUsuarios);

router.put(
  "/:id",
  autenticarToken,
  autorizarAdmin,
  userController.atualizarUsuario
);

router.delete(
  "/:id",
  autenticarToken,
  autorizarAdmin,
  userController.deletarUsuario
);

router.post("/login", userController.loginUsuario); // público

module.exports = router;
