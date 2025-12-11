import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Cart, CartRepository } from '../../../core/domain/cart/cart.model';
import { Product } from '../../../core/domain/product/product.model';

@Injectable()
export class CartHttpAdapter extends CartRepository {
    private readonly API_URL = 'http://localhost:3000/api/cart';

    constructor(private http: HttpClient) {
        super();
    }

    /**
     * Obtiene el carrito actual del usuario desde la API
     */
    async getCart(): Promise<Cart> {
        try {
            return await firstValueFrom(
                this.http.get<Cart>(this.API_URL)
            );
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw new Error('No se pudo cargar el carrito');
        }
    }

    /**
     * Agrega un producto al carrito
     * @param product - Producto a agregar
     * @param quantity - Cantidad a agregar
     * @returns Carrito actualizado
     */
    async addItem(product: Product, quantity: number): Promise<Cart> {
        try {
            return await firstValueFrom(
                this.http.post<Cart>(`${this.API_URL}/items`, {
                    productId: product.id,
                    quantity
                })
            );
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw new Error('No se pudo agregar el producto al carrito');
        }
    }

    /**
     * Elimina un producto del carrito
     * @param productId - ID del producto a eliminar
     * @returns Carrito actualizado
     */
    async removeItem(productId: string): Promise<Cart> {
        try {
            return await firstValueFrom(
                this.http.delete<Cart>(`${this.API_URL}/items/${productId}`)
            );
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            throw new Error('No se pudo eliminar el producto del carrito');
        }
    }
}
