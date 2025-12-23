import { Injectable } from '@angular/core';
import { Cart, CartItem, CartRepository } from '../../../core/domain/cart/cart.model';
import { Product } from '../../../core/domain/product/product.model';

@Injectable()
export class CartInMemoryAdapter extends CartRepository {
    private currentCart: Cart = { id: 'session-123', items: [], totalAmount: 0 };

    constructor() { super(); }

    getCart(): Promise<Cart> {
        return Promise.resolve(this.currentCart);
    }

    addItem(product: Product, quantity: number): Promise<Cart> {
        const existingItem = this.currentCart.items.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.currentCart.items.push({ product, quantity });
        }
        this.calculateTotal();
        return Promise.resolve(this.currentCart);
    }

    removeItem(productId: number): Promise<Cart> {
        this.currentCart.items = this.currentCart.items.filter(item => item.product.id !== productId);
        this.calculateTotal();
        return Promise.resolve(this.currentCart);
    }

    private calculateTotal() {
        this.currentCart.totalAmount = this.currentCart.items.reduce(
            (sum, item) => sum + item.product.precio * item.quantity, 0
        );
    }
}