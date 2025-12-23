import { Injectable, signal } from '@angular/core';
import { Category } from '../../../core/domain/category/category.model';

/**
 * Servicio de estado para Categorías usando Signals
 */
@Injectable({
    providedIn: 'root'
})
export class CategoryStateService {
    private _categories = signal<Category[]>([]);
    private _isLoading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    // Getters públicos (readonly)
    categories = this._categories.asReadonly();
    isLoading = this._isLoading.asReadonly();
    error = this._error.asReadonly();

    setCategories(categories: Category[]) {
        this._categories.set(categories);
    }

    addCategory(category: Category) {
        this._categories.update(categories => [...categories, category]);
    }

    updateCategory(id: number, updatedCategory: Category) {
        this._categories.update(categories =>
            categories.map(c => c.id === id ? updatedCategory : c)
        );
    }

    deleteCategory(id: number) {
        this._categories.update(categories => categories.filter(c => c.id !== id));
    }

    setLoading(loading: boolean) {
        this._isLoading.set(loading);
    }

    setError(error: string | null) {
        this._error.set(error);
    }
}
