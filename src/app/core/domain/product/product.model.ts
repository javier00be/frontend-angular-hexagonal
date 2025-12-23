export interface Product {
    id?: number;
    sku?: string;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    estado: number;
    imagen: string;
}

export abstract class ProductRepository {
    abstract getAll(): Promise<Product[]>;
    abstract getById(id: string): Promise<Product | null>;
    abstract insert(product: Product, file?: File): Promise<Product>;
    abstract update(product: Product, file?: File): Promise<Product>;
    abstract delete(id: string): Promise<void>;
}