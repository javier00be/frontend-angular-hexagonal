import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { Product } from '../../../core/domain/product/product.model';

@Injectable({ providedIn: 'root' })
export class ProductStateService {
    // Estado privado de productos
    private productsSignal: WritableSignal<Product[]> = signal([]);

    // Estado de carga
    private loadingSignal: WritableSignal<boolean> = signal(false);

    // Estado de error
    private errorSignal: WritableSignal<string | null> = signal(null);

    // Signals públicos readonly
    public readonly products: Signal<Product[]> = this.productsSignal.asReadonly();
    public readonly isLoading: Signal<boolean> = this.loadingSignal.asReadonly();
    public readonly error: Signal<string | null> = this.errorSignal.asReadonly();

    // Computed: Productos en stock
    public readonly inStockProducts: Signal<Product[]> = computed(() =>
        this.products().filter(p => p.cantidad > 0)
    );

    // Computed: Productos agotados
    public readonly outOfStockProducts: Signal<Product[]> = computed(() =>
        this.products().filter(p => p.cantidad === 0)
    );

    // Computed: Cantidad total de productos
    public readonly totalProducts: Signal<number> = computed(() =>
        this.products().length
    );

    // Métodos públicos
    setProducts(products: Product[]): void {
        this.productsSignal.set(products);
        this.errorSignal.set(null);
    }

    addProduct(product: Product): void {
        this.productsSignal.update(products => [...products, product]);
    }

    updateProduct(id: number, updates: Partial<Product>): void {
        this.productsSignal.update(products =>
            products.map(p => p.id === id ? { ...p, ...updates } : p)
        );
    }

    removeProduct(id: number): void {
        this.productsSignal.update(products =>
            products.filter(p => p.id !== id)
        );
    }

    setLoading(loading: boolean): void {
        this.loadingSignal.set(loading);
    }

    setError(error: string | null): void {
        this.errorSignal.set(error);
    }

    clearProducts(): void {
        this.productsSignal.set([]);
        this.errorSignal.set(null);
    }
}
