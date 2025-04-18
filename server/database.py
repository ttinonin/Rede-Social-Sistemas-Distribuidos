from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User

engine = create_engine("sqlite:///rede_social.db", echo=True)
Base.metadata.create_all(engine)

SessionLocal = sessionmaker(bind=engine)
