export interface Message {
    id: number;
    autor_id: number;
    room_id: number;
    conteudo: string;
    timestamp: Date;
}