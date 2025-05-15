import { Subscriber } from "zeromq";

// Cria um socket do tipo SUB
const socket: Subscriber = new Subscriber();

// Conecta ao publisher
socket.connect("tcp://localhost:5556");

// Assina os tópicos desejados
socket.subscribe("notif_user_1");
socket.subscribe("post_feed");
socket.subscribe("room_2");

console.log("[Subscriber] Ouvindo mensagens...");

async function listen() {
  for await (const [msg] of socket) {
    try {
      const message = msg.toString();
      const [topic, ...contentParts] = message.split(" ");
      const content = contentParts.join(" ");
      console.log(`[${topic}] ${content}`);
    } catch (err) {
      console.error(`[Erro no subscriber]`, err);
    }
  }
}

listen();
