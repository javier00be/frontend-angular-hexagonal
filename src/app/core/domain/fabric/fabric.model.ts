/**
 * Modelo de dominio para Tela (Fabric)
 */
export interface Fabric {
    id?: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
}

/**
 * Puerto de salida (Output Port) - Repositorio de Telas
 * Define el contrato que debe cumplir cualquier adaptador de infraestructura
 */
export abstract class FabricRepository {
    abstract getAll(): Promise<Fabric[]>;
    abstract create(fabric: Fabric): Promise<Fabric>;
    abstract update(fabric: Fabric): Promise<Fabric>;
    abstract delete(id: number): Promise<void>;
}
