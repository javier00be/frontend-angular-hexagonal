import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product, ProductRepository } from '../../../core/domain/product/product.model';

@Injectable()
export class ProductHttpAdapter extends ProductRepository {
    private readonly API_URL = 'http://localhost:3000/api/products';

    constructor(private http: HttpClient) {
        super();
    }

    /**
     * Obtiene todos los productos desde la API REST
     * Convierte el Observable de HttpClient a Promise usando firstValueFrom
     */
    async getAll(): Promise<Product[]> {
        try {
            return await firstValueFrom(
                this.http.get<Product[]>(this.API_URL)
            );
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw new Error('No se pudieron cargar los productos desde la API');
        }
    }

    /**
     * Obtiene un producto por ID desde la API REST
     * @param id - ID del producto a buscar
     * @returns Product si existe, null si no se encuentra
     */
    async getById(id: string): Promise<Product | null> {
        try {
            return await firstValueFrom(
                this.http.get<Product>(`${this.API_URL}/${id}`)
            );
        } catch (error) {
            console.error(`Error al obtener producto ${id}:`, error);
            return null;
        }
    }
}
