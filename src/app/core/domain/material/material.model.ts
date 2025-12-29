/**
 * Modelo de Material
 */
export interface Material {
    id: number;
    nombre: string;
    detalles: string;
    precio: number;
    stock: number;
    estado: number;
}

/**
 * Puerto de salida (Output port) - Repositorio de Material
 * Define el contrato que debe cumplir cualquier adaptador de infraestructura
 */
export abstract class MaterialRepository {
    abstract getAll(): Promise<Material[]>;
    abstract create(material: Material): Promise<Material>;
    abstract update(material: Material): Promise<Material>;
    abstract delete(id: number): Promise<void>;
}