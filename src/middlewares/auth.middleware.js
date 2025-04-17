const jwt = require("jsonwebtoken");

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //Bearer Token
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ mensagem: "Token inválido." });

    //Anexa informação do token request
    req.usuario = usuario;
    next();
  });
};

const autorizarAdmin = (req, res, next) => {
  if (req.usuario?.tipo !== "admin") {
    return res
      .status(403)
      .json({ mensagem: "Acesso restrito para administradores." });
  }
  next();
};

module.exports = {
  autenticarToken,
  autorizarAdmin,
};
