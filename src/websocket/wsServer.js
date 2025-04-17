const WebSocket = require("ws");

let wss;

function setupWebSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Cliente WebSocket conectado");

    ws.on("close", () => {
      console.log("Cliente WebSocket desconectado");
    });
  });
}

function broadcastPeso(peso) {
  if (!wss) return;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ tipo: "peso", valor: peso }));
    }
  });
}

module.exports = {
  setupWebSocket,
  broadcastPeso,
};
