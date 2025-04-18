from sqlalchemy import Column, Integer, String, DateTime, Table, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

seguidores_associacao = Table(
    'seguidores',
    Base.metadata,
    Column('seguidor_id', Integer, ForeignKey('usuarios.id')),
    Column('seguido_id', Integer, ForeignKey('usuarios.id'))
)

class User(Base):
    __tablename__ = 'usuarios'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    senha = Column(String, nullable=False)
    nome_completo = Column(String)
    bio = Column(Text, default="")
    foto_perfil_url = Column(String, default="")
    data_criacao = Column(DateTime, default=datetime.utcnow)

    seguidores = relationship(
        'User',
        secondary=seguidores_associacao,
        primaryjoin=id == seguidores_associacao.c.seguido_id,
        secondaryjoin=id == seguidores_associacao.c.seguidor_id,
        backref='seguindo'
    )
