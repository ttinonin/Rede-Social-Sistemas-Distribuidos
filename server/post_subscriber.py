import zmq

context = zmq.Context()
subscriber = context.socket(zmq.SUB)
subscriber.connect("tcp://127.0.0.1:5555")
subscriber.setsockopt_string(zmq.SUBSCRIBE, "")  # escuta tudo

print("Escutando novos posts...")

while True:
    post = subscriber.recv_json()
    print(f"[NOVO POST] Usuário {post['autor_id']}: {post['conteudo']} (em {post['data_criacao']})")
