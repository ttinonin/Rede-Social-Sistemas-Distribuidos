# publisher_process.py
import zmq
import json

context = zmq.Context()

# PULL para receber mensagens das instâncias FastAPI
pull_socket = context.socket(zmq.PULL)
pull_socket.bind("tcp://0.0.0.0:5555")

# PUB para distribuir mensagens aos inscritos
pub_socket = context.socket(zmq.PUB)
pub_socket.bind("tcp://0.0.0.0:5556")

print("Publisher ativo em:")
print("- Recebendo (PULL) em tcp://*:5555")
print("- Publicando (PUB) em tcp://*:5556")

while True:
    data = pull_socket.recv_json()
    topic = data["topic"]
    payload = data["payload"]
    if data != None:
        print(payload)

    pub_socket.send_string(f"{topic} {json.dumps(payload)}")
