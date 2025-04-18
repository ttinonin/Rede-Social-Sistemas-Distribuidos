from pydantic import BaseModel, EmailStr
from typing import Optional

# Para criação de usuário (entrada)
class UserCreate(BaseModel):
    username: str
    email: str
    senha: str
    nome_completo: Optional[str] = None
    bio: Optional[str] = None
    foto_perfil_url: Optional[str] = None

# Para resposta (sem senha)
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    nome_completo: Optional[str]
    bio: Optional[str]
    foto_perfil_url: Optional[str]

    class Config:
        orm_mode = True  # Permite transformar de ORM (SQLAlchemy) para Pydantic
