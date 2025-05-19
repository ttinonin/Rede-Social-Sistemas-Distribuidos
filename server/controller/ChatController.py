from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import zmq
import json
import time
import utils.publisher_core as publisher_core
from schemas.message_schema import MessageSchema, MessageUpdateSchema, ResponseMessageSchema
from utils.models import Message
from services.MessageService import MessageService
from services.RoomService import RoomService

router = APIRouter(prefix="/rooms", tags=["Messages"])


@router.post("/{room_id}/messages")
def send_message(room_id: str, message_sended: MessageSchema):
    message = Message(
        conteudo=message_sended.conteudo,
        autor_id=message_sended.autor_id,
        room_id=room_id
    )

    payload = {
        "id": message.id,
        "autor_id": message.autor_id,
        "conteudo": message.conteudo,
        "timestamp": message.timestamp
    }

    publisher_core.publish_message(room_id, payload)
    created = MessageService.criar_mensagem(message)
    return {"status": "ok", "sent_to": room_id}

@router.delete("/{message_id}")
def deletar_mensagem(message_id: int):
    if not MessageService.deletar_mensagem(message_id):
        raise HTTPException(status_code=404, detail="Mensagem não encontrada")
    return {"detail": "Mensagem deletada com sucesso"}

@router.get("/{room_id}", response_model=list[ResponseMessageSchema])
def buscar_mensagens_por_room(room_id: int):
    mensagens = MessageService.buscar_por_room(room_id)
    return mensagens

@router.put("/{message_id}", response_model=MessageSchema)
def atualizar_mensagem(message_id: int, update_data: MessageUpdateSchema):
    message = MessageService.atualizar_mensagem(message_id, update_data.novo_conteudo)
    if not message:
        raise HTTPException(status_code=404, detail="Mensagem não encontrada")
    return message
