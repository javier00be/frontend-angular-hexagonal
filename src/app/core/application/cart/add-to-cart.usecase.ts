import { Injectable } from '@angular/core';
import { Cart, CartRepository } from '../../domain/cart/cart.model';
import { Product } from '../../domain/product/product.model';

@Injectable({ providedIn: 'root' })
export class AddToCartUseCase {
    constructor(private cartRepository: CartRepository) { }

    execute(product: Product, quantity: number = 1): Promise<Cart> {
        // La lógica de negocio mínima para delegar al Repositorio (Adaptador)
        return this.cartRepository.addItem(product, quantity);
    }
}