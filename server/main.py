from fastapi import FastAPI
from controller import UserController, PostController, ChatController, RoomController
from utils.models import Base
from utils.database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

conexoes_ativas = 0 

origins = [
    "http://localhost:5173",  # Vite (React)
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
def status():
    return {
        "status": "ok",
        "conexoes_ativas": conexoes_ativas
    }

# Inclui o controller
app.include_router(UserController.router)
app.include_router(PostController.router)
app.include_router(ChatController.router)
app.include_router(RoomController.router)
