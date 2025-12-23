import { Injectable, signal } from '@angular/core';
import { Brand } from '../../../core/domain/brand/brand.model';

/**
 * Servicio de estado para Marcas usando Signals
 */
@Injectable({
    providedIn: 'root'
})
export class BrandStateService {
    private _brands = signal<Brand[]>([]);
    private _isLoading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    // Getters públicos (readonly)
    brands = this._brands.asReadonly();
    isLoading = this._isLoading.asReadonly();
    error = this._error.asReadonly();

    setBrands(brands: Brand[]) {
        this._brands.set(brands);
    }

    addBrand(brand: Brand) {
        this._brands.update(brands => [...brands, brand]);
    }

    updateBrand(id: number, updatedBrand: Brand) {
        this._brands.update(brands =>
            brands.map(b => b.id === id ? updatedBrand : b)
        );
    }

    deleteBrand(id: number) {
        this._brands.update(brands => brands.filter(b => b.id !== id));
    }

    setLoading(loading: boolean) {
        this._isLoading.set(loading);
    }

    setError(error: string | null) {
        this._error.set(error);
    }
}
