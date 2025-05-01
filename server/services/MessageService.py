from sqlalchemy.orm import Session
from models import Message
from database import SessionLocal

class MessageService:

    @staticmethod
    def criar_mensagem(message: Message) -> Message:
        session: Session = SessionLocal()
        try:
            session.add(message)
            session.commit()
            session.refresh(message)
            return message
        finally:
            session.close()

    @staticmethod
    def deletar_mensagem(message_id: int) -> bool:
        session: Session = SessionLocal()
        try:
            message = session.query(Message).filter(Message.id == message_id).first()
            if message:
                session.delete(message)
                session.commit()
                return True
            return False
        finally:
            session.close()

    @staticmethod
    def buscar_por_room(room_id: int) -> list[Message]:
        session: Session = SessionLocal()
        try:
            messages = session.query(Message).filter(Message.room_id == room_id).all()
            print(messages)
            return messages
        finally:
            session.close()
    
    @staticmethod
    def buscar_todos_as_mensagens() -> list[Message]:
        session: Session = SessionLocal()
        try:
            return session.query(Message).order_by(Message.timestamp.desc()).all()
        finally:
            session.close()

    @staticmethod
    def atualizar_mensagem(message_id: int, novo_conteudo: str) -> Message | None:
        session: Session = SessionLocal()
        try:
            message = session.query(Message).filter(Message.id == message_id).first()
            if message:
                message.conteudo = novo_conteudo
                session.commit()
                session.refresh(message)
                return message
            return None
        finally:
            session.close()
