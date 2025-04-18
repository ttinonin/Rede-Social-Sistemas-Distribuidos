from models import User
from database import SessionLocal

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
        # Atualiza os campos (menos o ID)
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
