const { Subscriber } = require("zeromq");
const WebSocket = require("ws");

const zmqSub = new Subscriber();
zmqSub.connect("tcp://0.0.0.0:5556");

// Subscrição genérica
zmqSub.subscribe();

const wss = new WebSocket.Server({ port: 6969 });

wss.on("connection", (ws) => {
  console.log("[WS] Cliente conectado");

  ws.on("message", (msg) => {
    console.log("[WS] Mensagem do cliente:", msg.toString());
  });

  ws.on("close", () => {
    console.log("[WS] Cliente desconectado");
  });
});

(async () => {
  for await (const [msg] of zmqSub) {
    const message = msg.toString();
    const spaceIndex = message.indexOf(" ");
    const topic = message.slice(0, spaceIndex); // "room_1"
    const content = message.slice(spaceIndex + 1); // o restante é o JSON

    console.log(`[ZMQ] ${topic}: ${content}`);

    // Enviar para todos os clientes WS
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ topic, content }));
      }
    });
  }
})();

