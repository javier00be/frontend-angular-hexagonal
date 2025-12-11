import { Injectable } from '@angular/core';
import { Product, ProductRepository } from '../../../core/domain/product/product.model';

const MOCK_PRODUCTS: Product[] = [
    { id: '1', name: 'Laptop Pro', description: 'Potente laptop para desarrollo.', price: 1200, stock: 10, imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg' },
    { id: '2', name: 'Monitor 4K', description: 'Pantalla de alta resolución.', price: 450, stock: 5, imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg' },
    { id: '3', name: 'Teclado Mecánico', description: 'Teclado de respuesta rápida.', price: 150, stock: 20, imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg' },
];

@Injectable()
export class ProductMockAdapter extends ProductRepository {
    constructor() { super(); }
    getAll(): Promise<Product[]> {
        return Promise.resolve(MOCK_PRODUCTS); // Simula la llamada HTTP
    }
    getById(id: string): Promise<Product | null> {
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        return Promise.resolve(product || null);
    }
}