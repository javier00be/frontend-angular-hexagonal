import { Cart, CartRepository } from '../../domain/cart/cart.model';
import { Product } from '../../domain/product/product.model';

export class AddToCartUseCase {
    constructor(private cartRepository: CartRepository) { }

    execute(product: Product, quantity: number = 1): Promise<Cart> {
        // La lógica de negocio mínima para delegar al Repositorio (Adaptador)
        return this.cartRepository.addItem(product, quantity);
    }
}