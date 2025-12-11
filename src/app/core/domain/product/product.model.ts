export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
}

export abstract class ProductRepository {
    abstract getAll(): Promise<Product[]>;
    abstract getById(id: string): Promise<Product | null>;
}