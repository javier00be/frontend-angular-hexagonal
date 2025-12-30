import { Injectable } from "@angular/core";
import { Material, MaterialRepository } from "../../../core/domain/material/material.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { firstValueFrom } from "rxjs";





@Injectable()
export class MaterialHttpAdapter extends MaterialRepository {
    private apiUrl = `${environment.apiUrl}/materiales`;
    
    constructor(private http: HttpClient) {
        super();
    }

    async getAll(): Promise<Material[]> {
        return firstValueFrom(this.http.get<Material[]>(this.apiUrl));
    }

    async create(material: Material): Promise<Material> {
        return firstValueFrom(this.http.post<Material>(this.apiUrl, material));
    }

    async update(material: Material): Promise<Material> {
        return firstValueFrom(this.http.put<Material>(`${this.apiUrl}/${material.id}`, material));
    }

    async delete(id: number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
    }
}