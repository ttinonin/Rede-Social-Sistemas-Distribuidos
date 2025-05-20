import asyncio
from fastapi import FastAPI, Request, Response, Body
from fastapi.exceptions import RequestValidationError
import httpx
from schemas.generic_body import GenericBody

app = FastAPI()
SERVERS = ["http://localhost:8001", "http://localhost:8002", "http://localhost:8003"]
server_status = {s: {"ok": True, "conexoes_ativas": 0} for s in SERVERS}


async def atualizar_status():
    while True:
        for server in SERVERS:
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(f"{server}/status")
                    data = resp.json()
                    server_status[server] = {
                        "ok": True,
                        "conexoes_ativas": data.get("conexoes_ativas", 0)
                    }
            except:
                server_status[server] = {"ok": False, "conexoes_ativas": float('inf')}
        await asyncio.sleep(2)


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(atualizar_status())


# @app.post("/rooms/{room_id}/messages")
# async def proxy_message(room_id: str, request: Request):
#     body = await request.body()
#     headers = dict(request.headers)

    

    
#         try:
#             async with httpx.AsyncClient() as client:
#                 response = await client.post(
#                     f"{server}/rooms/{room_id}/messages",
#                     content=body,
#                     headers=headers
#                 )
#                 return response.json()
#         except:
#             continue


@app.api_route("/{full_path:path}", methods=["POST"])
async def proxy(full_path: str, request: Request, body: GenericBody = Body(None)):
    method = request.method
    headers = dict(request.headers)
    headers.pop("content-length", None)
    print(full_path)
    headers.pop("host", None)
    headers["content-type"] = "application/json"

    # Ordena servidores por menor conexões
    servidores_disponiveis = sorted(
        [s for s in SERVERS if server_status[s]["ok"]],
        key=lambda s: server_status[s]["conexoes_ativas"]
    )

    for server in servidores_disponiveis:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.request(
                    method=method,
                    url=f"{server}/{full_path}",
                    json=body.root if body else None,
                    headers=headers,
                    params=dict(request.query_params)
                )

            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=dict(response.headers),
                media_type=response.headers.get("content-type")
            )

        except httpx.RequestError as e:
            return Response(
                content=f"Erro ao tentar encaminhar para {server}: {e}",
                status_code=503
            )
    return {"error": "Nenhum servidor disponível"}