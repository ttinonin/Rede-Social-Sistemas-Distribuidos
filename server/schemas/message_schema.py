from pydantic import BaseModel

class MessageSchema(BaseModel):
    autor_id: str
    content: str
