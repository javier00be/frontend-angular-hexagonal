import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Password } from 'primeng/password';
import { User } from '../../../../../core/domain/user/user.model';
import { CreateUserUseCase } from '../../../../../core/application/user/create-user.usecase';
import { UpdateUserUseCase } from '../../../../../core/application/user/update-user.usecase';

@Component({
    selector: 'app-user-form-modal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        Dialog,
        Button,
        InputText,
        Select,
        Password
    ],
    providers: [MessageService],
    templateUrl: './user-form-modal.component.html',
    styleUrl: './user-form-modal.component.css',
})
export class UserFormModalComponent implements OnChanges {
    @Input() visible: boolean = false;
    @Input() user: User | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<User>();
    @Output() onCancel = new EventEmitter<void>();
    userForm: FormGroup;
    isEditMode: boolean = false;

    // Opciones de rol
    rolOptions = [
        { label: 'Administrador', value: 1 },
        { label: 'Usuario', value: 2 },
        { label: 'Vendedor', value: 3 }
    ];

    constructor(
        private fb: FormBuilder,
        private createUser: CreateUserUseCase,
        private updateUser: UpdateUserUseCase,
        private messageService: MessageService
    ) {
        this.userForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            apellido_paterno: ['', [Validators.required, Validators.minLength(2)]],
            apellido_materno: ['', [Validators.required, Validators.minLength(2)]],
            telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rol: [1, [Validators.required]]
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['user'] && this.user) {
            this.isEditMode = true;
            this.userForm.patchValue({
                nombre: this.user.nombre,
                apellido_paterno: this.user.apellido_paterno,
                apellido_materno: this.user.apellido_materno,
                telefono: this.user.telefono,
                email: this.user.email,
                rol: this.user.rol
            });
            // En modo edición, la contraseña es opcional
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
        } else if (changes['user'] && !this.user) {
            this.isEditMode = false;
            this.userForm.reset({ rol: 1 });
            // En modo creación, la contraseña es requerida
            this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
            this.userForm.get('password')?.updateValueAndValidity();
        }
    }

    async handleSave() {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }
        const formValue = this.userForm.value;
        try {
            let savedUser: User;
            if (this.isEditMode && this.user) {
                // Si no se ingresó contraseña en edición, no la enviamos
                const updateData: any = { ...formValue, id: this.user.id };
                if (!formValue.password) {
                    delete updateData.password;
                }
                savedUser = await this.updateUser.execute(updateData);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente' });
            } else {
                savedUser = await this.createUser.execute(formValue);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado correctamente' });
            }
            this.onSave.emit(savedUser);
            this.userForm.reset({ rol: 1 });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al guardar el usuario';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        }
    }

    handleCancel() {
        this.userForm.reset({ rol: 1 });
        this.onCancel.emit();
    }

    onDialogHide() {
        this.visibleChange.emit(false);
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.userForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getFieldError(fieldName: string): string {
        const field = this.userForm.get(fieldName);
        if (field?.errors) {
            if (field.errors['required']) return 'Este campo es requerido';
            if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
            if (field.errors['email']) return 'Email inválido';
            if (field.errors['pattern']) return 'Formato inválido';
        }
        return '';
    }

}
