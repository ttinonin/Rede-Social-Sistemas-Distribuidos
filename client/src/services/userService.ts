import api, { userApi } from "./api";
import { User } from "../interfaces/User";

export const signUp = async (username: string, email: string, password: string): Promise<User> => {

    const res = await userApi.post<User>("/users", { 
        username, 
        email, 
        "senha": password,
        "nome_completo": "",
        "bio": "",
        "foto_perfil_url": "",
        "data_criacao": new Date()
    });
    return res.data;
};

export const fetchFollowing = async (followerId: number|undefined): Promise<User[]> => {
    const response = await api.get(`/users/${followerId}/seguindo`);
    return response.data;
}

export const fetchFollowers = async (userId: number|undefined): Promise<User[]> => {
  const response = await api.get(`/users/${userId}/seguidores`); // endpoint pra seguidores
  return response.data;
};

export const follow = async (followerId: number|undefined, followingId: number|undefined) => {
    const res = await api.post(`/users/${followerId}/seguir/${followingId}`);
}

export const getUser = async (id: string): Promise<User> => {
    const res = await userApi.get<User>(`/users/${id}`);
    return res.data;
};