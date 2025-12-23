import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product, ProductRepository } from '../../../core/domain/product/product.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProductHttpAdapter extends ProductRepository {
    private readonly API_URL = `${environment.apiUrl}/productos`;

    constructor(private http: HttpClient) {
        super();
    }


    /**
     * Inserta un nuevo producto en la API REST
     * Envía el producto como JSON y el archivo de imagen como multipart/form-data
     * @param product - Producto a insertar
     * @param file - Archivo de imagen (opcional)
     * @returns Product insertado
     */
    async insert(product: Product, file?: File): Promise<Product> {
        try {
            if (file) {
                // Si hay archivo, enviar como multipart/form-data (igual que Postman)
                const formData = new FormData();

                // Agregar el producto como JSON
                const productBlob = new Blob([JSON.stringify(product)], { type: 'application/json' });
                formData.append('producto', productBlob);

                // Agregar el archivo
                formData.append('file', file);

                const producto = await firstValueFrom(
                    this.http.post<Product>(this.API_URL, formData)
                );
                return producto;
            } else {
                // Sin archivo, enviar solo JSON
                const producto = await firstValueFrom(
                    this.http.post<Product>(this.API_URL, product)
                );
                return producto;
            }
        } catch (error) {
            throw new Error('No se pudo crear el producto en la API');
        }
    }

    /**
     * Actualiza un producto en la API REST
     * @param product - Producto a actualizar
     * @param file - Archivo de imagen (opcional)
     * @returns Product actualizado
     */
    async update(product: Product, file?: File): Promise<Product> {
        try {
            if (file) {
                // Si hay archivo, enviar como multipart/form-data
                const formData = new FormData();

                // Agregar el producto como JSON
                const productBlob = new Blob([JSON.stringify(product)], { type: 'application/json' });
                formData.append('producto', productBlob);

                // Agregar el archivo
                formData.append('file', file);

                const producto = await firstValueFrom(
                    this.http.put<Product>(`${this.API_URL}/${product.id}`, formData)
                );
                return producto;
            } else {
                // Sin archivo, enviar como multipart/form-data sin archivo
                const formData = new FormData();
                const productBlob = new Blob([JSON.stringify(product)], { type: 'application/json' });
                formData.append('producto', productBlob);

                const producto = await firstValueFrom(
                    this.http.put<Product>(`${this.API_URL}/${product.id}`, formData)
                );
                return producto;
            }
        } catch (error) {
            throw new Error('No se pudo actualizar el producto en la API');
        }
    }

    /**
     * Obtiene todos los productos desde la API REST de Spring Boot
     * Convierte el Observable de HttpClient a Promise usando firstValueFrom
     */
    async getAll(): Promise<Product[]> {
        try {
            const productos = await firstValueFrom(
                this.http.get<Product[]>(this.API_URL)
            );
            return productos;
        } catch (error) {
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
            const producto = await firstValueFrom(
                this.http.get<Product>(`${this.API_URL}/${id}`)
            );
            return producto;
        } catch (error) {
            return null;
        }
    }

    /**
     * Elimina un producto por ID desde la API REST
     * @param id - ID del producto a eliminar
     */
    async delete(id: string): Promise<void> {
        try {
            await firstValueFrom(
                this.http.delete(`${this.API_URL}/${id}`)
            );
        } catch (error) {
            throw new Error('No se pudo eliminar el producto en la API');
        }
    }
}
