import zmq

context = zmq.Context()
publisher = context.socket(zmq.PUB)
publisher.bind("tcp://127.0.0.1:5555")

def publicar_post(post_dict):
    publisher.send_json(post_dict)
