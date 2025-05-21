import api from "./api";
import { Room } from "../interfaces/Room";

export const getRooms = async(userId: number|undefined): Promise<Room[]> => {
    const res = await api.get(`/rooms/usuario/${userId}`);

    return res.data;
}