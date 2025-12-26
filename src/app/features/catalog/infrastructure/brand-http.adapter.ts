import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Brand, BrandRepository } from '../../../core/domain/brand/brand.model';
import { environment } from '../../../../environments/environment';

/**
 * Adaptador HTTP para Marcas
 * Implementa el puerto de salida BrandRepository
 * Conecta con el backend de Spring Boot
 */
@Injectable()
export class BrandHttpAdapter extends BrandRepository {
    private apiUrl = `${environment.apiUrl}/marcas`;

    constructor(private http: HttpClient) {
        super();
    }

    async getAll(): Promise<Brand[]> {
        return firstValueFrom(this.http.get<Brand[]>(this.apiUrl));
    }

    async create(brand: Brand): Promise<Brand> {
        // Solo enviar el nombre al backend, el estado se crea automáticamente
        const payload = { nombre: brand.nombre };
        return firstValueFrom(this.http.post<Brand>(this.apiUrl, payload));
    }

    async update(brand: Brand): Promise<Brand> {
        return firstValueFrom(
            this.http.put<Brand>(`${this.apiUrl}/${brand.id}`, brand)
        );
    }

    async delete(id: number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
    }
}
