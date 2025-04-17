const userService = require("../services/user.service");

//Login dos Usuários
const loginUsuario = async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ mensagem: "Usuário e senha obrigatórios." });
  }

  try {
    const loginInfo = await userService.autenticarUsuario(usuario, senha);
    res.status(200).json(loginInfo);
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensagem: error.message });
  }
};

//Refresh Token
const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ mensagem: "Refresh token não fornecido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensagem: "Refresh token inválido." });
    }

    const payload = {
      id: usuario.id,
      usuario: usuario.usuario,
      tipo: usuario.tipo,
    };

    const novoToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({ token: novoToken });
  });
};

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

//Atualizar Usuários
const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  try {
    const usuarioAtualizado = await userService.atualizarUsuario(id, dados);
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao atualizar usuário." });
  }
};

//Deleção de Usuários
const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioRemovido = await userService.deletarUsuario(id);

    if (!usuarioRemovido) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    res.status(200).json({
      mensagem: `Usuário '${usuarioRemovido.usuario}' removido com sucesso.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao deletar usuário." });
  }
};

module.exports = {
  loginUsuario,
  registrarUsuario,
  buscarUsuarios,
  atualizarUsuario,
  deletarUsuario,
};
