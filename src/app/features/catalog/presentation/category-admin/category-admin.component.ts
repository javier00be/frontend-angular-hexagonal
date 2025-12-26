import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
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
import { Category } from '../../../../core/domain/category/category.model';
import { GetAllCategoriesUseCase } from '../../../../core/application/category/get-all-categories.usecase';
import { UpdateCategoryUseCase } from '../../../../core/application/category/update-category.usecase';
import { CategoryStateService } from '../../../../shared/presentation/state/category-state.service';
import { CategoryFormModalComponent } from '../category-form-modal/category-form-modal.component';

@Component({
    selector: 'app-category-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, Button, InputText, ProgressSpinner, Message, Toast, IconField, InputIcon, ConfirmDialog, Tag, CategoryFormModalComponent],
    providers: [MessageService, ConfirmationService],
    templateUrl: './category-admin.component.html'
})
export class CategoryAdminComponent implements OnInit {
    searchValue: string = '';
    showCategoryModal: boolean = false;
    selectedCategory: Category | null = null;

    constructor(
        private getAllCategories: GetAllCategoriesUseCase,
        private updateCategory: UpdateCategoryUseCase,
        public categoryState: CategoryStateService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        await this.loadCategories();
    }

    async loadCategories() {
        this.categoryState.setLoading(true);
        this.categoryState.setError(null);
        try {
            const categories = await this.getAllCategories.execute();
            this.categoryState.setCategories(categories);
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'No se pudieron cargar las categorías';
            this.categoryState.setError(errorMsg);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        } finally {
            this.categoryState.setLoading(false);
        }
    }

    addNewCategory() {
        this.selectedCategory = null;
        this.showCategoryModal = true;
    }

    editCategory(category: Category) {
        this.selectedCategory = category;
        this.showCategoryModal = true;
    }

    confirmDelete(category: Category) {
        this.confirmationService.confirm({
            message: `¿Está seguro de desactivar la categoría "${category.nombre}"?`,
            header: 'Confirmar Desactivación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, desactivar',
            rejectLabel: 'Cancelar',
            accept: () => this.deleteCategoryConfirmed(category)
        });
    }

    async deleteCategoryConfirmed(category: Category) {
        try {
            // Borrado lógico: cambiar estado a 2 (INACTIVO)
            const updatedCategory = { ...category, estado: 2 };
            await this.updateCategory.execute(updatedCategory);

            // Actualizar el estado local
            this.categoryState.updateCategory(category.id!, updatedCategory);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Categoría "${category.nombre}" desactivada correctamente` });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al desactivar la categoría';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        }
    }

    async handleCategorySave(category: Category) {
        this.showCategoryModal = false;
        this.selectedCategory = null;
        await this.loadCategories();
    }

    handleCategoryCancel() {
        this.showCategoryModal = false;
        this.selectedCategory = null;
    }

    getStatusSeverity(estado?: number): 'success' | 'danger' {
        return estado === 1 ? 'success' : 'danger';
    }

    getStatusLabel(estado?: number): string {
        return estado === 1 ? 'ACTIVO' : 'INACTIVO';
    }
}
