import { Injectable } from "@angular/core";
import { User, UserRepository } from "../../../core/domain/user/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable()
export class UserHttpAdapter extends UserRepository {
    private apiUrl = `${environment.apiUrl}/usuarios`;

    constructor(private http: HttpClient) {
        super();
    }

    async getAll(): Promise<User[]> {
        return firstValueFrom(this.http.get<User[]>(this.apiUrl));
    }

    async create(user: User): Promise<User> {
        return firstValueFrom(this.http.post<User>(this.apiUrl, user));
    }

    async update(user: User): Promise<User> {
        return firstValueFrom(this.http.put<User>(`${this.apiUrl}/${user.id}`, user));
    }

    async delete(id: number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
    }
}
