require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { setupWebSocket } = require("./src/websocket/wsServer");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Rotas
const userRoutes = require("./src/routes/user.routes");
app.use("/api/usuarios", userRoutes);

// WebSocket
setupWebSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
