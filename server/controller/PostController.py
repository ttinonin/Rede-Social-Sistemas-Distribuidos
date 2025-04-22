from fastapi import APIRouter, HTTPException
from models import Post
from services.PostService import PostService
from schemas.post_schema import PostCreate, PostResponse
from post_publisher import publicar_post

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.post("/", response_model=PostResponse)
def criar_post(post_data: PostCreate):
    post = Post(**post_data.dict())
    salvo = PostService.criar_post(post)

    # Publica o post via ZeroMQ
    publicar_post({
        "id": salvo.id,
        "conteudo": salvo.conteudo,
        "autor_id": salvo.autor_id,
        "data_criacao": salvo.data_criacao.isoformat()
    })

    return salvo

@router.get("/", response_model=list[PostResponse])
def listar_posts():
    return PostService.buscar_todos_os_posts()

@router.get("/{post_id}", response_model=PostResponse)
def buscar_post(post_id: int):
    post = PostService.buscar_post_por_id(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return post

@router.put("/{post_id}", response_model=PostResponse)
def atualizar_post(post_id: int, dados: PostCreate):
    post_existente = PostService.buscar_post_por_id(post_id)
    if not post_existente:
        raise HTTPException(status_code=404, detail="Post não encontrado")

    post_existente.conteudo = dados.conteudo
    post_existente.autor_id = dados.autor_id

    return PostService.criar_post(post_existente)

@router.delete("/{post_id}")
def deletar_post(post_id: int):
    sucesso = PostService.deletar_post(post_id)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return {"mensagem": "Post deletado com sucesso"}
