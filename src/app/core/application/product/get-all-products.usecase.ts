import { Product, ProductRepository } from '../../domain/product/product.model';

export class GetAllProductsUseCase {
    constructor(private productRepository: ProductRepository) { }
    execute(): Promise<Product[]> {
        return this.productRepository.getAll();
    }
}