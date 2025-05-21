import api from "./api";
import { Room } from "../interfaces/Room";
import { Message } from "../interfaces/Message";

export const getRooms = async(userId: number|undefined): Promise<Room[]> => {
    const res = await api.get(`/rooms/usuario/${userId}`);

    return res.data;
}

export const sendMessage = async(roomId: string|undefined, conteudo: string, authorId: number|undefined) => {
    const res = await api.post<Message>(`/chat/${roomId}/messages`, { "autor_id": authorId, "room_id": roomId, "conteudo": conteudo })
}

export const getRoomMessages = async(roomId: string|undefined): Promise<Message[]> => {
    const res = await api.get(`/chat/${roomId}`);

    return res.data;
}