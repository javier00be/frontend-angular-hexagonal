import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { Cart } from '../../../core/domain/cart/cart.model';

@Injectable({ providedIn: 'root' })
export class CartStateService {
    // Estado privado del carrito (WritableSignal)
    private cartSignal: WritableSignal<Cart | null> = signal(null);

    // 🆕 Estado de carga
    private loadingSignal: WritableSignal<boolean> = signal(false);

    // 🆕 Estado de error
    private errorSignal: WritableSignal<string | null> = signal(null);

    // Estado público (Readonly Signal)
    public readonly currentCart: Signal<Cart | null> = this.cartSignal.asReadonly();

    // 🆕 Signals públicos para loading y error
    public readonly isLoading: Signal<boolean> = this.loadingSignal.asReadonly();
    public readonly error: Signal<string | null> = this.errorSignal.asReadonly();

    // Estado calculado (PrimeNG Badge count)
    public readonly itemCount: Signal<number> = computed(() => {
        return this.currentCart()?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
    });

    // 🆕 Computed: Total del carrito
    public readonly totalAmount: Signal<number> = computed(() => {
        return this.currentCart()?.totalAmount || 0;
    });

    // 🆕 Computed: Carrito vacío
    public readonly isEmpty: Signal<boolean> = computed(() => {
        return this.itemCount() === 0;
    });

    // Método para actualizar el estado desde cualquier Adaptador de Entrada
    updateCart(newCart: Cart): void {
        this.cartSignal.set(newCart);
        this.errorSignal.set(null); // Limpiar error al actualizar exitosamente
    }

    // 🆕 Método para actualizar estado de carga
    setLoading(loading: boolean): void {
        this.loadingSignal.set(loading);
    }

    // 🆕 Método para actualizar estado de error
    setError(error: string | null): void {
        this.errorSignal.set(error);
    }

    // 🆕 Método para limpiar el carrito
    clearCart(): void {
        this.cartSignal.set(null);
        this.errorSignal.set(null);
    }
}