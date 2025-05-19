from sqlalchemy.orm import Session, joinedload
from utils.database import SessionLocal
from utils.models import Room, User


class RoomService:
    @staticmethod
    def criar_room(room: Room) -> Room:
        session: Session = SessionLocal()
        try:
            session.add(room)
            session.commit()
            session.refresh(room)
            return room
        finally:
            session.close()

    @staticmethod
    def buscar_todas_as_rooms() -> list[Room]:
        session: Session = SessionLocal()
        try:
            return (
                session.query(Room)
                .options(joinedload(Room.usuarios))
                .all()
            )
        finally:
            session.close()

    @staticmethod
    def buscar_room_por_id(room_id: int) -> Room | None:
        session: Session = SessionLocal()
        try:
            return session.query(Room).filter(Room.id == room_id).first()
        finally:
            session.close()

    @staticmethod
    def buscar_rooms_por_usuario_id(user_id: int) -> list[Room]:
        session: Session = SessionLocal()
        try:
            return (
                session.query(Room)
                .join(Room.usuarios)
                .filter(User.id == user_id)
                .all()
            )
        finally:
            session.close()

    @staticmethod
    def buscar_rooms_com_nome_por_usuario_id(user_id: int) -> list[Room]:
        session: Session = SessionLocal()
        try:
            return (
                session.query(Room)
                .join(Room.usuarios)
                .filter(User.id == user_id, Room.nome.isnot(None))
                .all()
            )
        finally:
            session.close()

    @staticmethod
    def adicionar_usuario_na_room(room_id: int, user_id: int) -> Room | None:
        session: Session = SessionLocal()
        try:
            room = session.query(Room).filter(Room.id == room_id).first()
            user = session.query(User).filter(User.id == user_id).first()
            if room and user and user not in room.usuarios:
                room.usuarios.append(user)
                session.commit()
                session.refresh(room)
            return room
        finally:
            session.close()

    @staticmethod
    def deletar_room(room_id: int) -> bool:
        session: Session = SessionLocal()
        try:
            room = session.query(Room).filter(Room.id == room_id).first()
            if room:
                session.delete(room)
                session.commit()
                return True
            return False
        finally:
            session.close()
