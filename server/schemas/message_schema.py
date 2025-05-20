from pydantic import BaseModel
from datetime import datetime

class MessageSchema(BaseModel):
    autor_id: int
    room_id: int
    conteudo: str

class ResponseMessageSchema(BaseModel):
    id: int
    autor_id: int
    room_id: int
    conteudo: str
    timestamp: datetime

    class Config:
        orm_mode = True

class MessageUpdateSchema(BaseModel):
    novo_conteudo: str
