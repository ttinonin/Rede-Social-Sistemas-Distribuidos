from sqlalchemy import func
from utils.models import User, Room
from utils.database import SessionLocal

class UserService:
    @staticmethod
    def criar_usuario(usuario: User):
        session = SessionLocal()
        session.add(usuario)
        session.commit()
        session.refresh(usuario)
        session.close()
        return usuario

    @staticmethod
    def buscar_usuario_por_id(user_id: int):
        session = SessionLocal()
        usuario = session.query(User).get(user_id)
        session.close()
        return usuario

    @staticmethod
    def buscar_todos_usuarios():
        session = SessionLocal()
        usuarios = session.query(User).all()
        session.close()
        return usuarios

    @staticmethod
    def atualizar_usuario(usuario: User):
        session = SessionLocal()
        db_usuario = session.query(User).get(usuario.id)
        if not db_usuario:
            session.close()
            return None
        
        db_usuario.username = usuario.username
        db_usuario.email = usuario.email
        db_usuario.senha = usuario.senha
        db_usuario.nome_completo = usuario.nome_completo
        db_usuario.bio = usuario.bio
        db_usuario.foto_perfil_url = usuario.foto_perfil_url
        session.commit()
        session.refresh(db_usuario)
        session.close()
        return db_usuario

    @staticmethod
    def deletar_usuario(usuario: User):
        session = SessionLocal()
        db_usuario = session.query(User).get(usuario.id)
        if not db_usuario:
            session.close()
            return False
        session.delete(db_usuario)
        session.commit()
        session.close()
        return True

    # ------- NOVAS FUNÇÕES PARA RELACIONAMENTO DE FOLLOW ---------

    @staticmethod
    def seguir_usuario(seguidor_id: int, seguido_id: int):
        session = SessionLocal()
        try:
            seguidor = session.query(User).get(seguidor_id)
            seguido = session.query(User).get(seguido_id)

            if not seguidor or not seguido:
                raise ValueError("Usuário não encontrado")

            if seguido in seguidor.seguindo:
                return  # já está seguindo

            seguidor.seguindo.append(seguido)

            # Verifica se já existe uma room entre os dois
            existing_room = (
                session.query(Room)
                .join(Room.usuarios)
                .filter(User.id.in_([seguidor_id, seguido_id]))
                .group_by(Room.id)
                .having(func.count(Room.id) == 2)
                .first()
            )

            if not existing_room:
                # Criar room
                nova_room = Room(nome=None)
                nova_room.usuarios.append(seguidor)
                nova_room.usuarios.append(seguido)
                session.add(nova_room)

            session.commit()
        finally:
            session.close()

    @staticmethod
    def parar_de_seguir_usuario(follower_id: int, followed_id: int):
        session = SessionLocal()
        follower = session.query(User).get(follower_id)
        followed = session.query(User).get(followed_id)
        if not follower or not followed:
            session.close()
            return None
        if followed in follower.seguindo:
            follower.seguindo.remove(followed)
        session.commit()
        session.close()
        return True

    @staticmethod
    def listar_seguidores(user_id: int):
        session = SessionLocal()
        user = session.query(User).get(user_id)
        if not user:
            session.close()
            return None
        seguidores = user.seguidores
        session.close()
        return seguidores

    @staticmethod
    def listar_seguidos(user_id: int):
        session = SessionLocal()
        user = session.query(User).get(user_id)
        if not user:
            session.close()
            return None
        seguindo = user.seguindo
        session.close()
        return seguindo
