from fastapi import APIRouter, HTTPException
from typing import List
from models import User
from services.UserService import UserService
from schemas.user_schema import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse)
def criar_usuario(usuario_data: UserCreate):
    usuario = User(**usuario_data.dict())  # Converte UserCreate → User (SQLAlchemy)
    return UserService.criar_usuario(usuario)

@router.get("/", response_model=List[UserResponse])
def listar_usuarios():
    return UserService.buscar_todos_usuarios()

@router.get("/{user_id}", response_model=UserResponse)
def buscar_usuario(user_id: int):
    usuario = UserService.buscar_usuario_por_id(user_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@router.put("/{user_id}", response_model=UserResponse)
def atualizar_usuario(user_id: int, usuario: UserCreate):
    usuario.id = user_id
    atualizado = UserService.atualizar_usuario(usuario)
    if not atualizado:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return atualizado

@router.delete("/{user_id}", status_code=204)
def deletar_usuario(user_id: int):
    usuario = UserService.buscar_usuario_por_id(user_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    sucesso = UserService.deletar_usuario(usuario)
    if not sucesso:
        raise HTTPException(status_code=500, detail="Erro ao deletar")
