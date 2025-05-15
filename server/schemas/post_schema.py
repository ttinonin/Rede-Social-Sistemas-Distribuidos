from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostCreate(BaseModel):
    titulo: str
    conteudo: str
    autor_id: int

class PostResponse(BaseModel):
    id: int
    titulo: str
    conteudo: str
    autor_id: int
    data_criacao: datetime

    class Config:
        orm_mode = True
