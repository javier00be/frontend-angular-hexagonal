/**
 * Modelo de dominio para Categoría (Category)
 */
export interface Category {
    id?: number;
    nombre: string;
    estado?: number
}

/**
 * Puerto de salida (Output Port) - Repositorio de Categorías
 * Define el contrato que debe cumplir cualquier adaptador de infraestructura
 */
export abstract class CategoryRepository {
    abstract getAll(): Promise<Category[]>;
    abstract create(category: Category): Promise<Category>;
    abstract update(category: Category): Promise<Category>;
    abstract delete(id: number): Promise<void>;
}
