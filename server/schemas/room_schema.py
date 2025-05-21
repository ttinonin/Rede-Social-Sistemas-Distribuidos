from pydantic import BaseModel
from typing import List, Optional


class UsuarioOut(BaseModel):
    id: int
    username: Optional[str]

    class Config:
        orm_mode = True


class RoomOut(BaseModel):
    id: int
    nome: Optional[str]
    usuarios: List[UsuarioOut] = []

    class Config:
        orm_mode = True
