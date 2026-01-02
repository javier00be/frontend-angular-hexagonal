import { Injectable } from '@angular/core';
import { Product, ProductRepository } from '../../domain/product/product.model';

@Injectable({
    providedIn: 'root'
})
export class GetProductByIdUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute(id: string): Promise<Product | null> {
        return await this.productRepository.getById(id);
    }
}
