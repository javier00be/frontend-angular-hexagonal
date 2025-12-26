import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Fabric, FabricRepository } from '../../../core/domain/fabric/fabric.model';
import { environment } from '../../../../environments/environment';

/**
 * Adaptador HTTP para Telas
 * Implementa el puerto de salida FabricRepository
 * Conecta con el backend de Spring Boot
 */
@Injectable()
export class FabricHttpAdapter extends FabricRepository {
    private apiUrl = `${environment.apiUrl}/telas`;

    constructor(private http: HttpClient) {
        super();
    }

    async getAll(): Promise<Fabric[]> {
        return firstValueFrom(this.http.get<Fabric[]>(this.apiUrl));
    }

    async create(fabric: Fabric): Promise<Fabric> {
        // Solo enviar el nombre al backend, el estado se crea automáticamente
        const payload = { nombre: fabric.nombre };
        return firstValueFrom(this.http.post<Fabric>(this.apiUrl, payload));
    }

    async update(fabric: Fabric): Promise<Fabric> {
        return firstValueFrom(
            this.http.put<Fabric>(`${this.apiUrl}/${fabric.id}`, fabric)
        );
    }

    async delete(id: number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
    }
}
