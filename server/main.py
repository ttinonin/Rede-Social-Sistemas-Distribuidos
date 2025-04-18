from fastapi import FastAPI
from controller import UserController
from models import Base
from database import engine

app = FastAPI()

# Inclui o controller
app.include_router(UserController.router)
