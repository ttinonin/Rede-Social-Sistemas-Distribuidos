export interface User {
    id: string;
    username: string;
    email: string;
    nome_completo?: string;
    bio?: string;
    foto_perfil_url?: string;
}