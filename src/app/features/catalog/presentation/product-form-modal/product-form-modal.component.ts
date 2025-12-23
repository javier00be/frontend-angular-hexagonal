import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';

// Domain
import { Product } from '../../../../core/domain/product/product.model';

export interface ProductWithFile {
    product: Product;
    file: File | null;
}

@Component({
    selector: 'app-product-form-modal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        Button,
        InputText,
        TextareaModule,
        InputNumber,
        TooltipModule
    ],
    templateUrl: './product-form-modal.component.html'
})
export class ProductFormModalComponent implements OnInit, OnChanges {
    @Input() visible: boolean = false;
    @Input() product: Product | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<ProductWithFile>();
    @Output() onCancel = new EventEmitter<void>();

    productForm!: FormGroup;
    isEditMode: boolean = false;

    // File upload properties
    selectedFile: File | null = null;
    imagePreview: string | null = null;
    uploadProgress: number = 0;

    constructor(
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        private appRef: ApplicationRef
    ) { }

    ngOnInit() {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.productForm) return;

        if (this.product) {
            this.isEditMode = true;
            this.patchForm();
        } else {
            this.isEditMode = false;
            this.resetForm();
        }
    }

    initForm() {
        this.productForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            descripcion: ['', [Validators.required]],
            precio: [0, [Validators.required, Validators.min(0)]],
            cantidad: [0, [Validators.required, Validators.min(0)]],
            estado: [1],
            imagen: ['', [Validators.required]]
        });
    }

    patchForm() {
        if (this.product) {
            this.productForm.patchValue({
                nombre: this.product.nombre,
                descripcion: this.product.descripcion,
                precio: this.product.precio,
                cantidad: this.product.cantidad,
                estado: this.product.estado,
                imagen: this.product.imagen
            });
        }
    }

    resetForm() {
        this.productForm.reset({
            nombre: '',
            descripcion: '',
            precio: 0,
            cantidad: 0,
            estado: 1,
            imagen: ''
        });
        this.selectedFile = null;
        this.imagePreview = null;
        this.uploadProgress = 0;
    }

    handleSave() {
        if (this.productForm.valid) {
            const formValue = this.productForm.value;
            const productData: Product = {
                ...formValue,
                id: this.product?.id
            };

            // Emitir producto + archivo para que el padre maneje la lógica
            this.onSave.emit({
                product: productData,
                file: this.selectedFile
            });

            this.closeDialog();
        } else {
            Object.keys(this.productForm.controls).forEach(key => {
                this.productForm.get(key)?.markAsTouched();
            });
        }
    }

    handleCancel() {
        this.onCancel.emit();
        this.closeDialog();
    }

    closeDialog() {
        this.visible = false;
        this.resetForm();
    }

    onDialogHide() {
        this.visibleChange.emit(false);
        this.resetForm();
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.productForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }

    getFieldError(fieldName: string): string {
        const field = this.productForm.get(fieldName);
        if (field?.errors) {
            if (field.errors['required']) return 'Este campo es requerido';
            if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
            if (field.errors['min']) return `El valor mínimo es ${field.errors['min'].min}`;
        }
        return '';
    }

    /**
     * Manejo de archivos con input nativo
     */
    onFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];

            // Validar tamaño (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('La imagen no debe superar 5MB');
                input.value = '';
                return;
            }

            // Validar tipo
            if (!file.type.startsWith('image/')) {
                alert('Solo se permiten archivos de imagen');
                input.value = '';
                return;
            }

            this.selectedFile = file;
            this.productForm.patchValue({ imagen: 'pending-upload' });

            // Crear preview INMEDIATO con TRIPLE detección de cambios
            const reader = new FileReader();
            reader.onload = (e) => {
                this.ngZone.run(() => {
                    this.imagePreview = e.target?.result as string;
                    console.log('✅ Preview cargado:', this.imagePreview ? 'SÍ' : 'NO');

                    // FORZAR detección de cambios de 3 formas diferentes
                    this.cdr.detectChanges();           // 1. Detectar en este componente
                    this.cdr.markForCheck();            // 2. Marcar para revisión
                    this.appRef.tick();                 // 3. Forzar ciclo completo de Angular
                });
            };
            reader.readAsDataURL(file);
        }
    }

    onFileRemove() {
        this.selectedFile = null;
        this.imagePreview = null;
        this.uploadProgress = 0;
        this.productForm.patchValue({ imagen: '' });
    }
}
