from sqlalchemy import Column, Integer, String, DateTime, Table, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

seguidores_associacao = Table(
    'seguidores',
    Base.metadata,
    Column('seguidor_id', Integer, ForeignKey('users.id')),
    Column('seguido_id', Integer, ForeignKey('users.id'))
)

class User(Base):
    __tablename__ = 'users'
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
    posts = relationship("Post", back_populates="autor", cascade="all, delete-orphan")
    mensagens_enviadas = relationship("Message", back_populates="remetente", foreign_keys='Message.remetente_id', cascade="all, delete-orphan")
    mensagens_recebidas = relationship("Message", back_populates="destinatario", foreign_keys='Message.destinatario_id', cascade="all, delete-orphan")

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    conteudo = Column(Text, nullable=False)
    data_criacao = Column(DateTime, default=datetime.utcnow)
    autor_id = Column(Integer, ForeignKey("users.id"))

    autor = relationship("User", back_populates="posts")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conteudo = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    remetente_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destinatario_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    remetente = relationship("User", foreign_keys=[remetente_id], back_populates="mensagens_enviadas")
    destinatario = relationship("User", foreign_keys=[destinatario_id], back_populates="mensagens_recebidas")
