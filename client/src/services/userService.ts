import api from "./api";
import { User } from "../interfaces/User";

export const signUp = async (username: string, email: string, password: string): Promise<User> => {
    const res = await api.post<User>("/users/", { username, email, "senha": password });
    return res.data;
};