import { Product } from '../product/product.model';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    id: string;
    items: CartItem[];
    totalAmount: number;
}

export abstract class CartRepository {
    abstract getCart(): Promise<Cart>;
    abstract addItem(product: Product, quantity: number): Promise<Cart>;
    abstract removeItem(productId: string): Promise<Cart>;
}