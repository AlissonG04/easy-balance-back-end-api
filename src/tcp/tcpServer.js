const { criarClienteBalanca } = require("./balancaClient");

const startTCPClients = () => {
  criarClienteBalanca(
    "Balança 1",
    process.env.BALANCA_1_IP,
    process.env.BALANCA_1_PORTA
  );
  criarClienteBalanca(
    "Balança 2",
    process.env.BALANCA_2_IP,
    process.env.BALANCA_2_PORTA
  );
};

module.exports = { startTCPClients };
