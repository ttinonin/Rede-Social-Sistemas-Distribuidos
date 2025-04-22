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
