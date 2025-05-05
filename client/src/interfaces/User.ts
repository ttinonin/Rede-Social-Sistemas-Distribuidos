export interface User {
    id: number;
    username: string;
    email: string;
    nome_completo?: string;
    bio?: string;
    foto_perfil_url?: string;
}