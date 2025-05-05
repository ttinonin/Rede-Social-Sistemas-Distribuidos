import api from "./api";
import { Post } from "../interfaces/Post";

export const createPost = async (
    conteudo: string, 
    autor_id: number, 
): Promise<Post> => {
    const res = await api.post<Post>("/posts/", { conteudo, autor_id });
    return res.data;
};