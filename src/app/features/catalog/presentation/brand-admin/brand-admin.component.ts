import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { Table, TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';

// Hexagonal Imports
import { Brand } from '../../../../core/domain/brand/brand.model';
import { GetAllBrandsUseCase } from '../../../../core/application/brand/get-all-brands.usecase';
import { UpdateBrandUseCase } from '../../../../core/application/brand/update-brand.usecase';
import { BrandStateService } from '../../../../shared/presentation/state/brand-state.service';
import { BrandFormModalComponent } from '../brand-form-modal/brand-form-modal.component';

@Component({
    selector: 'app-brand-admin',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        Button,
        InputText,
        ProgressSpinner,
        Message,
        Toast,
        IconField,
        InputIcon,
        ConfirmDialog,
        Tag,
        BrandFormModalComponent
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './brand-admin.component.html'
})
export class BrandAdminComponent implements OnInit {
    searchValue: string = '';
    showBrandModal: boolean = false;
    selectedBrand: Brand | null = null;

    constructor(
        private getAllBrands: GetAllBrandsUseCase,
        private updateBrand: UpdateBrandUseCase,
        public brandState: BrandStateService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        await this.loadBrands();
    }

    async loadBrands() {
        this.brandState.setLoading(true);
        this.brandState.setError(null);

        try {
            const brands = await this.getAllBrands.execute();
            this.brandState.setBrands(brands);
        } catch (error) {
            const errorMsg = error instanceof Error
                ? error.message
                : 'No se pudieron cargar las marcas';

            this.brandState.setError(errorMsg);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMsg
            });
        } finally {
            this.brandState.setLoading(false);
        }
    }

    addNewBrand() {
        this.selectedBrand = null;
        this.showBrandModal = true;
    }

    editBrand(brand: Brand) {
        this.selectedBrand = brand;
        this.showBrandModal = true;
    }

    confirmDelete(brand: Brand) {
        this.confirmationService.confirm({
            message: `¿Está seguro de desactivar la marca "${brand.nombre}"?`,
            header: 'Confirmar Desactivación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, desactivar',
            rejectLabel: 'Cancelar',
            accept: () => this.deleteBrandConfirmed(brand)
        });
    }

    async deleteBrandConfirmed(brand: Brand) {
        try {
            // Borrado lógico: cambiar estado a 2 (INACTIVO)
            const updatedBrand = { ...brand, estado: 2 };
            await this.updateBrand.execute(updatedBrand);

            // Actualizar el estado local
            this.brandState.updateBrand(brand.id!, updatedBrand);

            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: `Marca "${brand.nombre}" desactivada correctamente`
            });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al desactivar la marca';
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMsg
            });
        }
    }

    async handleBrandSave(brand: Brand) {
        this.showBrandModal = false;
        this.selectedBrand = null;
        await this.loadBrands();
    }

    handleBrandCancel() {
        this.showBrandModal = false;
        this.selectedBrand = null;
    }

    getStatusSeverity(estado?: number): 'success' | 'danger' {
        return estado === 1 ? 'success' : 'danger';
    }

    getStatusLabel(estado?: number): string {
        return estado === 1 ? 'ACTIVO' : 'INACTIVO';
    }
}
