import type { Rol } from "./Rol";

export interface IUsers {
  email: string;
  password: string;
  role: Rol;
}
