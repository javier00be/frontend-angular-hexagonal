import { Injectable } from '@angular/core';
import { Product, ProductRepository } from '../../domain/product/product.model';

@Injectable({ providedIn: 'root' })
export class CreateProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute(product: Product, file?: File): Promise<Product> {
        return await this.productRepository.insert(product, file);
    }
}
