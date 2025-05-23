import zmq

context = zmq.Context()
socket = context.socket(zmq.SUB)
socket.connect("tcp://0.0.0.0:5556") 



socket.setsockopt_string(zmq.SUBSCRIBE, "room_2")

print("[Subscriber] Ouvindo mensagens...")

while True:
    try:
        msg = socket.recv_string()
        topic, content = msg.split(" ", 1)
        print(f"[{topic}] {content}")
    except Exception as e:
        print(f"[Erro no subscriber] {e}")

