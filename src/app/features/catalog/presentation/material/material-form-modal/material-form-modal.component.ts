import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Material } from '../../../../../core/domain/material/material.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CreateMaterialUseCase } from '../../../../../core/application/material/create-material.usecase';
import { UpdateMaterialUseCase } from '../../../../../core/application/material/update-material.usecase';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-material-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Dialog,
    Button,
    InputText
  ],
  providers: [MessageService],
  templateUrl: './material-form-modal.component.html',
  styleUrl: './material-form-modal.component.css',
})
export class MaterialFormModalComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() material: Material | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Material>();
  @Output() onCancel = new EventEmitter<void>();
  materialForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private createMaterial: CreateMaterialUseCase, private updateMaterial: UpdateMaterialUseCase, private messageService: MessageService) {
    this.materialForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['material'] && this.material) {
      this.isEditMode = true;
      this.materialForm.patchValue({
        nombre: this.material.nombre
      });
    } else if (changes['material'] && !this.material) {
      this.isEditMode = false;
      this.materialForm.reset();
    }
  }

  async handleSave() {
    if (this.materialForm.invalid) {
      this.materialForm.markAllAsTouched();
      return;
    }
    const formValue = this.materialForm.value;
    try {
      let savedMaterial: Material;
      if (this.isEditMode && this.material) {
        savedMaterial = await this.updateMaterial.execute({
          ...formValue, id: this.material.id
        });
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Material actualizado correctamente' });
      } else {
        savedMaterial = await this.createMaterial.execute(formValue);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Material creado correctamente' });
      }
      this.onSave.emit(savedMaterial);
      this.materialForm.reset();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al guardar el material';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
    }
  }

  handleCancel() {
    this.materialForm.reset();
    this.onCancel.emit();
  }

  onDialogHide() {
    this.visibleChange.emit(false);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.materialForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.materialForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

}
