from fastapi import FastAPI
from controller import UserController, PostController, ChatController
from models import Base
from database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite (React)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui o controller
app.include_router(UserController.router)
app.include_router(PostController.router)
app.include_router(ChatController.router)
