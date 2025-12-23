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
import { DeleteCategoryUseCase } from '../../../../core/application/category/delete-category.usecase';
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
        private deleteCategory: DeleteCategoryUseCase,
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
            message: `¿Está seguro de eliminar la categoría "${category.nombre}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            accept: () => this.deleteCategoryConfirmed(category)
        });
    }

    async deleteCategoryConfirmed(category: Category) {
        try {
            await this.deleteCategory.execute(category.id!);
            this.categoryState.deleteCategory(category.id!);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Categoría "${category.nombre}" eliminada correctamente` });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al eliminar la categoría';
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

    getStatusSeverity(activo: boolean): 'success' | 'danger' {
        return activo ? 'success' : 'danger';
    }

    getStatusLabel(activo: boolean): string {
        return activo ? 'Activo' : 'Inactivo';
    }
}
