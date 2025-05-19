from fastapi import APIRouter, HTTPException
from typing import List

from services.RoomService import RoomService
from utils.models import Room
from schemas.room_schema import RoomOut

router = APIRouter(
    prefix="/rooms",
    tags=["Rooms"]
)

# @router.post("/", response_model=RoomOut)
# def criar_room(room_data: RoomCreate):
#     room = Room(nome=room_data.nome)
#     # Adiciona usuários (se houver) no RoomService
#     for user_id in room_data.usuario_ids:
#         RoomService.adicionar_usuario_na_room(room.id, user_id)
#     room_criada = RoomService.criar_room(room)
#     return room_criada

@router.get("/", response_model=List[RoomOut])
def listar_todas_as_rooms():
    return RoomService.buscar_todas_as_rooms()

@router.get("/{room_id}", response_model=RoomOut)
def buscar_room_por_id(room_id: int):
    room = RoomService.buscar_room_por_id(room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room não encontrada.")
    return room

@router.get("/usuario/{user_id}", response_model=List[RoomOut])
def buscar_rooms_por_usuario(user_id: int):
    return RoomService.buscar_rooms_por_usuario_id(user_id)

@router.post("/{room_id}/adicionar-usuario/{user_id}", response_model=RoomOut)
def adicionar_usuario_na_room(room_id: int, user_id: int):
    room = RoomService.adicionar_usuario_na_room(room_id, user_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room ou usuário não encontrados.")
    return room

@router.delete("/{room_id}")
def deletar_room(room_id: int):
    sucesso = RoomService.deletar_room(room_id)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Room não encontrada.")
    return {"detail": "Room deletada com sucesso."}
