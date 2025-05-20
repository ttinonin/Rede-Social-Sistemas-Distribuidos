from fastapi import FastAPI, Request
import httpx
import random

app = FastAPI()

# Lista de instâncias FastAPI disponíveis
FASTAPI_SERVERS = [
    "http://localhost:8001",
    "http://localhost:8002",
    "http://localhost:8003",
]

@app.post("/rooms/{room_id}/messages")
async def proxy_message(room_id: str, request: Request):
    body = await request.body()

    for _ in range(len(FASTAPI_SERVERS)):
        server = random.choice(FASTAPI_SERVERS)
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(f"{server}/rooms/{room_id}/messages", content=body, headers=request.headers)
                return response.json()
        except Exception as e:
            print(f"Erro ao tentar {server}: {e}")
            continue

    return {"error": "Todas as instâncias falharam"}
