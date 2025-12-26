import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { Category } from '../../../../core/domain/category/category.model';
import { CreateCategoryUseCase } from '../../../../core/application/category/create-category.usecase';
import { UpdateCategoryUseCase } from '../../../../core/application/category/update-category.usecase';

@Component({
    selector: 'app-category-form-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, Dialog, Button, InputText],
    templateUrl: './category-form-modal.component.html'
})
export class CategoryFormModalComponent implements OnChanges {
    @Input() visible: boolean = false;
    @Input() category: Category | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<Category>();
    @Output() onCancel = new EventEmitter<void>();
    categoryForm: FormGroup;
    isEditMode: boolean = false;

    constructor(private fb: FormBuilder, private createCategory: CreateCategoryUseCase, private updateCategory: UpdateCategoryUseCase, private messageService: MessageService) {
        this.categoryForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['category'] && this.category) {
            this.isEditMode = true;
            this.categoryForm.patchValue({
                nombre: this.category.nombre
            });
        } else if (changes['category'] && !this.category) {
            this.isEditMode = false;
            this.categoryForm.reset();
        }
    }

    async handleSave() {
        if (this.categoryForm.invalid) {
            this.categoryForm.markAllAsTouched();
            return;
        }
        const formValue = this.categoryForm.value;
        try {
            let savedCategory: Category;
            if (this.isEditMode && this.category) {
                savedCategory = await this.updateCategory.execute({
                    ...formValue, id: this.category.id
                });
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría actualizada correctamente' });
            } else {
                savedCategory = await this.createCategory.execute(formValue);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría creada correctamente' });
            }
            this.onSave.emit(savedCategory);
            this.categoryForm.reset();
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al guardar la categoría';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        }
    }

    handleCancel() {
        this.categoryForm.reset();
        this.onCancel.emit();
    }

    onDialogHide() {
        this.visibleChange.emit(false);
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.categoryForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getFieldError(fieldName: string): string {
        const field = this.categoryForm.get(fieldName);
        if (field?.errors) {
            if (field.errors['required']) return 'Este campo es requerido';
            if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
        }
        return '';
    }
}
