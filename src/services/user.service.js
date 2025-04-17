const db = require("../config/db");
const bcrypt = require("bcrypt");

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

module.exports = {
  criarUsuario,
  // Em breve: buscarUsuarios, atualizarUsuario, deletarUsuario
};
