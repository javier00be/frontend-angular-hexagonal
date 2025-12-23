import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { Fabric } from '../../../../core/domain/fabric/fabric.model';
import { CreateFabricUseCase } from '../../../../core/application/fabric/create-fabric.usecase';
import { UpdateFabricUseCase } from '../../../../core/application/fabric/update-fabric.usecase';

@Component({
    selector: 'app-fabric-form-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, Dialog, Button, InputText, Checkbox],
    templateUrl: './fabric-form-modal.component.html'
})
export class FabricFormModalComponent implements OnChanges {
    @Input() visible: boolean = false;
    @Input() fabric: Fabric | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<Fabric>();
    @Output() onCancel = new EventEmitter<void>();
    fabricForm: FormGroup;
    isEditMode: boolean = false;

    constructor(private fb: FormBuilder, private createFabric: CreateFabricUseCase, private updateFabric: UpdateFabricUseCase, private messageService: MessageService) {
        this.fabricForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            descripcion: ['', [Validators.required, Validators.minLength(5)]],
            activo: [true]
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['fabric'] && this.fabric) {
            this.isEditMode = true;
            this.fabricForm.patchValue({ nombre: this.fabric.nombre, descripcion: this.fabric.descripcion, activo: this.fabric.activo });
        } else if (changes['fabric'] && !this.fabric) {
            this.isEditMode = false;
            this.fabricForm.reset({ activo: true });
        }
    }

    async handleSave() {
        if (this.fabricForm.invalid) {
            this.fabricForm.markAllAsTouched();
            return;
        }
        const formValue = this.fabricForm.value;
        try {
            let savedFabric: Fabric;
            if (this.isEditMode && this.fabric) {
                savedFabric = await this.updateFabric.execute({ ...formValue, id: this.fabric.id });
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tela actualizada correctamente' });
            } else {
                savedFabric = await this.createFabric.execute(formValue);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tela creada correctamente' });
            }
            this.onSave.emit(savedFabric);
            this.fabricForm.reset({ activo: true });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al guardar la tela';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        }
    }

    handleCancel() {
        this.fabricForm.reset({ activo: true });
        this.onCancel.emit();
    }

    onDialogHide() {
        this.visibleChange.emit(false);
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.fabricForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getFieldError(fieldName: string): string {
        const field = this.fabricForm.get(fieldName);
        if (field?.errors) {
            if (field.errors['required']) return 'Este campo es requerido';
            if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
        }
        return '';
    }
}
