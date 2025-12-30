/**
 * Modelo de Usuario
 */
export interface User {
    id?: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    rol: number;
    telefono: string;
    email: string;
    password?: string;
    estado: number;
}

/**
 * Puerto de salida (Output port) - Repositorio de Usuario
 * Define el contrato que debe cumplir cualquier adaptador de infraestructura
 */
export abstract class UserRepository {
    abstract getAll(): Promise<User[]>;
    abstract create(user: User): Promise<User>;
    abstract update(user: User): Promise<User>;
    abstract delete(id: number): Promise<void>;
}
