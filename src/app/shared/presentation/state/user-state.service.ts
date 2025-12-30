import { Injectable, signal } from '@angular/core';
import { User } from '../../../core/domain/user/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserStateService {
    private _users = signal<User[]>([]);
    private _isLoading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    //Getters Públicos (readonly)
    users = this._users.asReadonly();
    isLoading = this._isLoading.asReadonly();
    error = this._error.asReadonly();

    setUsers(users: User[]) {
        this._users.set(users);
    }

    addUser(user: User) {
        this._users.update(users => [...users, user]);
    }

    updateUser(id: number, updatedUser: User) {
        this._users.update(users =>
            users.map(user => user.id === id ? updatedUser : user)
        );
    }

    deleteUser(id: number) {
        this._users.update(users => users.filter(user => user.id !== id));
    }

    setLoading(loading: boolean) {
        this._isLoading.set(loading);
    }

    setError(error: string | null) {
        this._error.set(error);
    }
}
