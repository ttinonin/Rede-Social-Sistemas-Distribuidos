from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import zmq
import json
import time
import publisher_core
from schemas.message_schema import MessageSchema
from models import Message

router = APIRouter(prefix="/rooms", tags=["Messages"])


@router.post("/{room_id}/messages")
def send_message(room_id: str, message: MessageSchema):
    payload = {
        "autor_id": message.autor_id,
        "content": message.content,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    publisher_core.publish_message(room_id, payload)
    # message = Message()
    # message.autor_id = payload["autor_id"]
    # message.conteudo = payload["content"]
    return {"status": "ok", "sent_to": room_id}
