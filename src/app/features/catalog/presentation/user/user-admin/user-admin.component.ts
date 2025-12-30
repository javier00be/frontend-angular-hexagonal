import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../core/domain/user/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { ProgressSpinner } from 'primeng/progressspinner';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';
import { Toast } from 'primeng/toast';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GetAllUsersUseCase } from '../../../../../core/application/user/get-all-users.usecase';
import { UpdateUserUseCase } from '../../../../../core/application/user/update-user.usecase';
import { UserStateService } from '../../../../../shared/presentation/state/user-state.service';

@Component({
    selector: 'app-user-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, Button, InputText,
        ProgressSpinner, Message, Toast, IconField, InputIcon, ConfirmDialog, Tag, UserFormModalComponent],
    providers: [MessageService, ConfirmationService],
    templateUrl: './user-admin.component.html',
    styleUrl: './user-admin.component.css',
})
export class UserAdminComponent implements OnInit {
    searchValue: string = '';
    showUserModal: boolean = false;
    selectedUser: User | null = null;

    constructor(
        private getAllUsers: GetAllUsersUseCase,
        private updateUser: UpdateUserUseCase,
        public userState: UserStateService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    async ngOnInit() {
        await this.loadUsers();
    }

    async loadUsers() {
        this.userState.setLoading(true);
        this.userState.setError(null);
        try {
            const users = await this.getAllUsers.execute();
            this.userState.setUsers(users);
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'No se pudieron cargar los usuarios';
            this.userState.setError(errorMsg);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        } finally {
            this.userState.setLoading(false);
        }
    }

    addNewUser() {
        this.selectedUser = null;
        this.showUserModal = true;
    }

    editUser(user: User) {
        this.selectedUser = user;
        this.showUserModal = true;
    }

    confirmDelete(user: User) {
        this.confirmationService.confirm({
            message: `¿Está seguro de desactivar al usuario "${this.getFullName(user)}"?`,
            header: 'Confirmar Desactivación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, desactivar',
            rejectLabel: 'Cancelar',
            accept: () => this.deleteUserConfirmed(user)
        });
    }

    async deleteUserConfirmed(user: User) {
        try {
            // Borrado lógico: cambiar estado a 2 (INACTIVO)
            const updatedUser = { ...user, estado: 2 };
            await this.updateUser.execute(updatedUser);

            // Actualizar el estado local
            this.userState.updateUser(user.id!, updatedUser);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Usuario "${this.getFullName(user)}" desactivado correctamente` });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al desactivar el usuario';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        }
    }

    async handleUserSave(user: User) {
        this.showUserModal = false;
        this.selectedUser = null;
        await this.loadUsers();
    }

    handleUserCancel() {
        this.showUserModal = false;
        this.selectedUser = null;
    }

    getStatusSeverity(estado?: number): 'success' | 'danger' {
        return estado === 1 ? 'success' : 'danger';
    }

    getStatusLabel(estado?: number): string {
        return estado === 1 ? 'ACTIVO' : 'INACTIVO';
    }

    getRolLabel(rol?: number): string {
        switch (rol) {
            case 1: return 'Administrador';
            case 2: return 'Usuario';
            case 3: return 'Vendedor';
            default: return 'Desconocido';
        }
    }

    getRolSeverity(rol?: number): 'info' | 'success' | 'warn' {
        switch (rol) {
            case 1: return 'info';
            case 2: return 'success';
            case 3: return 'warn';
            default: return 'info';
        }
    }

    getFullName(user: User): string {
        return `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`;
    }

}
