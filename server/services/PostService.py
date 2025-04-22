from sqlalchemy.orm import Session
from models import Post
from database import SessionLocal

class PostService:

    @staticmethod
    def criar_post(post: Post) -> Post:
        session: Session = SessionLocal()
        try:
            session.add(post)
            session.commit()
            session.refresh(post)
            return post
        finally:
            session.close()

    @staticmethod
    def buscar_todos_os_posts() -> list[Post]:
        session: Session = SessionLocal()
        try:
            return session.query(Post).order_by(Post.data_criacao.desc()).all()
        finally:
            session.close()

    @staticmethod
    def buscar_post_por_id(post_id: int) -> Post | None:
        session: Session = SessionLocal()
        try:
            return session.query(Post).filter(Post.id == post_id).first()
        finally:
            session.close()

    @staticmethod
    def deletar_post(post_id: int) -> bool:
        session: Session = SessionLocal()
        try:
            post = session.query(Post).filter(Post.id == post_id).first()
            if post:
                session.delete(post)
                session.commit()
                return True
            return False
        finally:
            session.close()
