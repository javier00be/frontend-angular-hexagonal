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
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectButton } from 'primeng/selectbutton';

// Hexagonal Imports
import { Product } from '../../../../../core/domain/product/product.model';
import { GetAllProductsUseCase } from '../../../../../core/application/product/get-all-products.usecase';
import { ProductStateService } from '../../../../../shared/presentation/state/product-state.service';

@Component({
    selector: 'app-product-list',
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
        IconField,
        InputIcon,
        SelectButton
    ],
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    searchValue: string = '';
    layout: 'list' | 'grid' = 'grid';

    layoutOptions = [
        { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' },
        { label: 'Lista', value: 'list', icon: 'pi pi-bars' }
    ];

    constructor(
        private getAllProducts: GetAllProductsUseCase,
        public productState: ProductStateService
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
     * Agrega producto al carrito (funcionalidad futura)
     */
    addToCart(product: Product) {
        console.log('Agregar al carrito:', product);
        // TODO: Implementar funcionalidad de carrito
    }
}
