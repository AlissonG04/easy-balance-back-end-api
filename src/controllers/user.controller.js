const userService = require("../services/user.service");

const registrarUsuario = async (req, res) => {
  try {
    const { usuario, senha, tipo } = req.body;
    if (!usuario || !senha || !tipo) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios ausentes." });
    }

    const novoUsuario = await userService.criarUsuario({
      usuario,
      senha,
      tipo,
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao registrar usuário." });
  }
};

module.exports = {
  registrarUsuario,
  // Em breve: buscarUsuarios, atualizarUsuario, deletarUsuario
};
