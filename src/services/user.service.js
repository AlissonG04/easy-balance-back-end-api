const db = require("../config/db");
const bcrypt = require("bcrypt");

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

module.exports = {
  criarUsuario,
  listarUsuarios,
  // Em breve: buscarUsuarios, atualizarUsuario, deletarUsuario
};
