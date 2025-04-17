const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Altenticação de Usuários
const autenticarUsuario = async (usuario, senha) => {
  const query = `SELECT * FROM usuarios WHERE usuario = $1`;
  const result = await db.query(query, [usuario]);

  if (result.rows.length === 0) {
    throw new Error("Usuário não encontrado.");
  }

  const user = result.rows[0];
  const senhaConfere = await bcrypt.compare(senha, user.senha);

  if (!senhaConfere) {
    throw new Error("Senha incorreta.");
  }

  const payload = {
    id: user.id,
    usuario: user.usuario,
    tipo: user.tipo,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

  return {
    token,
    usuario: user.usuario,
    tipo: user.tipo,
    id: user.id,
  };
};

//Criação de Usuários
const criarUsuario = async ({ usuario, senha, tipo }) => {
  const hash = await bcrypt.hash(senha, 10);

  const query = `
    INSERT INTO usuarios (usuario, senha, tipo)
    VALUES ($1, $2, $3)
    RETURNING id, usuario, tipo, criado_em;
  `;

  const values = [usuario, hash, tipo];

  const result = await db.query(query, values);
  return result.rows[0];
};

//Listar Usuários
const listarUsuarios = async () => {
  const result = await db.query(`
    SELECT id, usuario, tipo, criado_em
    FROM usuarios
    ORDER BY criado_em DESC;
  `);
  return result.rows;
};

//Atualizar Usuários
const atualizarUsuario = async (id, { usuario, senha, tipo }) => {
  const campos = [];
  const valores = [];
  let index = 1;

  if (usuario) {
    campos.push(`usuario = $${index++}`);
    valores.push(usuario);
  }

  if (senha) {
    const senhaHash = await bcrypt.hash(senha, 10);
    campos.push(`senha = $${index++}`);
    valores.push(senhaHash);
  }

  if (tipo) {
    campos.push(`tipo = $${index++}`);
    valores.push(tipo);
  }

  if (campos.length === 0) {
    throw new Error("Nenhum dado para atualizar.");
  }

  valores.push(id);
  const query = `
    UPDATE usuarios
    SET ${campos.join(", ")}
    WHERE id = $${index}
    RETURNING id, usuario, tipo, criado_em;
  `;

  const result = await db.query(query, valores);
  return result.rows[0];
};

//Deleção de Usuários
const deletarUsuario = async (id) => {
  const query = `
    DELETE FROM usuarios
    WHERE id = $1
    RETURNING id, usuario;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  autenticarUsuario,
  criarUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario,
  // Em breve: buscarUsuarios, atualizarUsuario, deletarUsuario
};
