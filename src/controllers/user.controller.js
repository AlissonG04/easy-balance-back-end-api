const userService = require("../services/user.service");

//Rota de Criação de Usuários
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

//Buscar Usuários
const buscarUsuarios = async (req, res) => {
  try {
    const usuarios = await userService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar usuários." });
  }
};

module.exports = {
  registrarUsuario,
  buscarUsuarios,
  // Em breve: buscarUsuarios, atualizarUsuario, deletarUsuario
};
