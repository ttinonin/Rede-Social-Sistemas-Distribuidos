import zmq
import threading
import queue
import time
import json

post_queue = queue.Queue()
message_queue = queue.Queue()
context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:5556")

def publish_post(post):
    socket.send_string(f"post_feed {json.dumps(post)}")

def publish_message(room_id, msg):
    socket.send_string(f"room_{room_id} {json.dumps(msg)}")
