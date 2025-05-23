# utils/publisher_client.py
import zmq

context = zmq.Context()
push_socket = context.socket(zmq.PUSH)
push_socket.connect("tcp://0.0.0.0:5555")  # Conecta ao processo publisher

def publish_message(room_id: str, payload: dict):
    push_socket.send_json({
        "topic": f"room_{room_id}",
        "payload": payload
    })

def publish_post(post: dict):
    push_socket.send_json({
        "topic": "post_feed",
        "payload": post
    })
