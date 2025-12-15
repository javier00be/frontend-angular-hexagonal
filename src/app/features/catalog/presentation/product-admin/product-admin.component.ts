import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { DataViewModule } from 'primeng/dataview';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectButton } from 'primeng/selectbutton';

// Hexagonal Imports
import { Product } from '../../../../core/domain/product/product.model';
import { GetAllProductsUseCase } from '../../../../core/application/product/get-all-products.usecase';
import { ProductStateService } from '../../../../shared/presentation/state/product-state.service';

@Component({
    selector: 'app-product-admin',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DataViewModule,
        Button,
        InputText,
        Tag,
        ProgressSpinner,
        Message,
        Toast,
        IconField,
        InputIcon,
        SelectButton
    ],
    providers: [MessageService],
    templateUrl: './product-admin.component.html',
    styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent implements OnInit {
    searchValue: string = '';
    layout: 'list' | 'grid' = 'grid';

    layoutOptions = [
        { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' },
        { label: 'Lista', value: 'list', icon: 'pi pi-bars' }
    ];

    constructor(
        private getAllProducts: GetAllProductsUseCase,
        public productState: ProductStateService,
        private messageService: MessageService
    ) { }

    async ngOnInit() {
        await this.loadProducts();
    }

    /**
     * Carga los productos desde la API
     */
    async loadProducts() {
        this.productState.setLoading(true);
        this.productState.setError(null);

        try {
            const products = await this.getAllProducts.execute();
            this.productState.setProducts(products);
        } catch (error) {
            const errorMsg = error instanceof Error
                ? error.message
                : 'No se pudieron cargar los productos';

            this.productState.setError(errorMsg);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMsg
            });
        } finally {
            this.productState.setLoading(false);
        }
    }

    /**
     * Determina la severidad del tag de stock
     */
    getStockSeverity(stock: number): 'success' | 'warn' | 'danger' {
        if (stock === 0) return 'danger';
        if (stock < 10) return 'warn';
        return 'success';
    }

    /**
     * Obtiene el label del stock
     */
    getStockLabel(stock: number): string {
        if (stock === 0) return 'Agotado';
        if (stock < 10) return 'Bajo Stock';
        return 'Disponible';
    }

    /**
     * Formatea precio como moneda
     */
    formatCurrency(value: number): string {
        return `$${value.toFixed(2)}`;
    }

    /**
     * Acciones de productos
     */
    editProduct(product: Product) {
        this.messageService.add({
            severity: 'info',
            summary: 'Editar',
            detail: `Editando producto: ${product.name}`
        });
        // TODO: Implementar modal de edición
    }

    deleteProduct(product: Product) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Eliminar',
            detail: `Eliminando producto: ${product.name}`
        });
        // TODO: Implementar confirmación y eliminación
    }

    addNewProduct() {
        this.messageService.add({
            severity: 'success',
            summary: 'Nuevo Producto',
            detail: 'Abriendo formulario de nuevo producto'
        });
        // TODO: Implementar modal de creación
    }
}
