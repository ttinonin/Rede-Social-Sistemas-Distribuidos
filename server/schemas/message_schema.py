from pydantic import BaseModel

class MessageSchema(BaseModel):
    autor_id: int
    room_id: int
    conteudo: str

class ResponseMessageSchema(BaseModel):
    id: int
    autor_id: int
    room_id: int
    conteudo: str

    class Config:
        orm_mode = True

class MessageUpdateSchema(BaseModel):
    novo_conteudo: str
