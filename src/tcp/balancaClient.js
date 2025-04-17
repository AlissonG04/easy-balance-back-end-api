const net = require("net");
const { broadcastPeso } = require("../websocket/wsServer");
require("dotenv").config();

const criarClienteBalanca = (nome, ip, porta) => {
  const client = new net.Socket();

  const conectar = () => {
    client.connect(porta, ip, () => {
      console.log(`Conectado à ${nome} (${ip}:${porta})`);
    });
  };

  client.on("data", (data) => {
    const peso = data.toString().trim();
    console.log(`[${nome}] Peso recebido:`, peso);

    broadcastPeso({ balanca: nome, valor: peso });
  });

  client.on("error", (err) => {
    console.error(`Erro na conexão com ${nome}:`, err.message);
    setTimeout(conectar, 5000); // reconectar após erro
  });

  client.on("close", () => {
    console.log(`Conexão com ${nome} encerrada. Tentando reconectar...`);
    setTimeout(conectar, 5000); // reconectar após desconexão
  });

  conectar();
};

module.exports = { criarClienteBalanca };
