import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Category, CategoryRepository } from '../../../core/domain/category/category.model';
import { environment } from '../../../../environments/environment';

/**
 * Adaptador HTTP para Categorías
 * Implementa el puerto de salida CategoryRepository
 * Conecta con el backend de Spring Boot
 */
@Injectable()
export class CategoryHttpAdapter extends CategoryRepository {
    private apiUrl = `${environment.apiUrl}/categorias`;

    constructor(private http: HttpClient) {
        super();
    }

    async getAll(): Promise<Category[]> {
        return firstValueFrom(this.http.get<Category[]>(this.apiUrl));
    }

    async create(category: Category): Promise<Category> {
        return firstValueFrom(this.http.post<Category>(this.apiUrl, category));
    }

    async update(category: Category): Promise<Category> {
        return firstValueFrom(
            this.http.put<Category>(`${this.apiUrl}/${category.id}`, category)
        );
    }

    async delete(id: number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
    }
}
