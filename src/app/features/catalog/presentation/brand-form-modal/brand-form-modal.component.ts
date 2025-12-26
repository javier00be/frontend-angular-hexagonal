import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// PrimeNG
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';

// Hexagonal
import { Brand } from '../../../../core/domain/brand/brand.model';
import { CreateBrandUseCase } from '../../../../core/application/brand/create-brand.usecase';
import { UpdateBrandUseCase } from '../../../../core/application/brand/update-brand.usecase';

@Component({
    selector: 'app-brand-form-modal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        Dialog,
        Button,
        InputText,
    ],
    templateUrl: './brand-form-modal.component.html'
})
export class BrandFormModalComponent implements OnChanges {
    @Input() visible: boolean = false;
    @Input() brand: Brand | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<Brand>();
    @Output() onCancel = new EventEmitter<void>();

    brandForm: FormGroup;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private createBrand: CreateBrandUseCase,
        private updateBrand: UpdateBrandUseCase,
        private messageService: MessageService
    ) {
        this.brandForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['brand'] && this.brand) {
            this.isEditMode = true;
            this.brandForm.patchValue({
                nombre: this.brand.nombre
            });
        } else if (changes['brand'] && !this.brand) {
            this.isEditMode = false;
            this.brandForm.reset();
        }
    }

    async handleSave() {
        if (this.brandForm.invalid) {
            this.brandForm.markAllAsTouched();
            return;
        }

        const formValue = this.brandForm.value;

        try {
            let savedBrand: Brand;

            if (this.isEditMode && this.brand) {
                savedBrand = await this.updateBrand.execute({
                    ...formValue,
                    id: this.brand.id
                });
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Marca actualizada correctamente'
                });
            } else {
                savedBrand = await this.createBrand.execute(formValue);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Marca creada correctamente'
                });
            }

            this.onSave.emit(savedBrand);
            this.brandForm.reset();
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al guardar la marca';
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMsg
            });
        }
    }

    handleCancel() {
        this.brandForm.reset();
        this.onCancel.emit();
    }

    onDialogHide() {
        this.visibleChange.emit(false);
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.brandForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getFieldError(fieldName: string): string {
        const field = this.brandForm.get(fieldName);
        if (field?.errors) {
            if (field.errors['required']) return 'Este campo es requerido';
            if (field.errors['minlength']) {
                const minLength = field.errors['minlength'].requiredLength;
                return `Mínimo ${minLength} caracteres`;
            }
        }
        return '';
    }
}
