import { User } from "./User";

export interface Room {
  id: number;
  nome?: string;
  usuarios: User[];
}