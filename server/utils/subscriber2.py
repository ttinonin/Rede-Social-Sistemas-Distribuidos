import zmq

context = zmq.Context()
socket = context.socket(zmq.SUB)
socket.connect("tcp://localhost:5556")  # Mesmo endereço e porta do publisher

# Escolha os tópicos que deseja assinar
socket.setsockopt_string(zmq.SUBSCRIBE, "post_feed")
socket.setsockopt_string(zmq.SUBSCRIBE, "room_1")

print("[Subscriber] Ouvindo mensagens...")

while True:
    try:
        msg = socket.recv_string()
        topic, content = msg.split(" ", 1)
        print(f"[{topic}] {content}")
    except Exception as e:
        print(f"[Erro no subscriber] {e}")

