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
import { CreateProductUseCase } from '../../../../core/application/product/create-product.usecase';
import { UpdateProductUseCase } from '../../../../core/application/product/update-product.usecase';
import { ProductStateService } from '../../../../shared/presentation/state/product-state.service';
import { ProductFormModalComponent } from '../product-form-modal/product-form-modal.component';

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
        SelectButton,
        ProductFormModalComponent
    ],
    providers: [MessageService],
    templateUrl: './product-admin.component.html'
})
export class ProductAdminComponent implements OnInit {
    searchValue: string = '';
    layout: 'list' | 'grid' = 'grid';

    // Modal state
    showProductModal: boolean = false;
    selectedProduct: Product | null = null;

    layoutOptions = [
        { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' },
        { label: 'Lista', value: 'list', icon: 'pi pi-bars' }
    ];

    constructor(
        private getAllProducts: GetAllProductsUseCase,
        private createProduct: CreateProductUseCase,
        private updateProduct: UpdateProductUseCase,
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
    getStockSeverity(cantidad: number): 'success' | 'warn' | 'danger' {
        if (cantidad === 0) return 'danger';
        if (cantidad < 10) return 'warn';
        return 'success';
    }

    /**
     * Obtiene el label del stock
     */
    getStockLabel(cantidad: number): string {
        if (cantidad === 0) return 'Agotado';
        if (cantidad < 10) return 'Bajo Stock';
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
        this.selectedProduct = product;
        this.showProductModal = true;
    }

    deleteProduct(product: Product) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Eliminar',
            detail: `Eliminando producto: ${product.nombre}`
        });
        // TODO: Implementar confirmación y eliminación
    }

    addNewProduct() {
        this.selectedProduct = null;
        this.showProductModal = true;
    }

    /**
     * Manejo del modal de producto
     */
    async handleProductSave(data: { product: Product; file: File | null }) {
        try {
            const { product, file } = data;

            if (product.id) {
                // Actualizar producto existente con archivo opcional
                const updatedProduct = await this.updateProduct.execute(product, file || undefined);
                this.productState.updateProduct(product.id, updatedProduct);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Producto "${updatedProduct.nombre}" actualizado correctamente`
                });
            } else {
                // Crear nuevo producto con archivo
                const createdProduct = await this.createProduct.execute(product, file || undefined);
                this.productState.addProduct(createdProduct);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Producto "${createdProduct.nombre}" creado correctamente`
                });
            }
            this.showProductModal = false;
            this.selectedProduct = null;

            // Recargar la lista de productos
            await this.loadProducts();
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al guardar el producto';
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMsg
            });
        }
    }

    handleProductCancel() {
        this.showProductModal = false;
        this.selectedProduct = null;
    }
}
