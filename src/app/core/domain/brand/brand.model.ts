/**
 * Modelo de dominio para Marca (Brand)
 */
export interface Brand {
    id?: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
}

/**
 * Puerto de salida (Output Port) - Repositorio de Marcas
 * Define el contrato que debe cumplir cualquier adaptador de infraestructura
 */
export abstract class BrandRepository {
    abstract getAll(): Promise<Brand[]>;
    abstract create(brand: Brand): Promise<Brand>;
    abstract update(brand: Brand): Promise<Brand>;
    abstract delete(id: number): Promise<void>;
}
