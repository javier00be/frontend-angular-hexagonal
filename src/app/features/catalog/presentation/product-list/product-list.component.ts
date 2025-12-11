import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { DataView } from 'primeng/dataview';
import { SelectButton } from 'primeng/selectbutton';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';

// Hexagonal Imports
import { Product } from '../../../../core/domain/product/product.model';
import { GetAllProductsUseCase } from '../../../../core/application/product/get-all-products.usecase';
import { AddToCartUseCase } from '../../../../core/application/cart/add-to-cart.usecase';
import { CartStateService } from '../../../../shared/presentation/state/cart-state.service';
import { ProductStateService } from '../../../../shared/presentation/state/product-state.service';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DataView,
        SelectButton,
        Button,
        Tag,
        ProgressSpinner,
        Toast,
        Message
    ],
    providers: [MessageService],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
    // Vista del DataView
    layout: 'list' | 'grid' = 'grid';
    
    layoutOptions = [
        { label: 'Lista', value: 'list' },
        { label: 'Grid', value: 'grid' }
    ];

    constructor(
        private getAllProducts: GetAllProductsUseCase,
        private addToCartUseCase: AddToCartUseCase,
        public productState: ProductStateService,
        public cartState: CartStateService,
        private messageService: MessageService
    ) { }

    async ngOnInit() {
        await this.loadProducts();
    }

    /**
     * Carga los productos desde la API usando el caso de uso
     * Maneja estados de loading, error y success con signals
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
     * Agrega un producto al carrito
     * Maneja estados de loading y error del carrito con signals
     */
    async onAddToCart(product: Product) {
        this.cartState.setLoading(true);

        try {
            const updatedCart = await this.addToCartUseCase.execute(product, 1);
            this.cartState.updateCart(updatedCart);

            this.messageService.add({
                severity: 'success',
                summary: 'Agregado',
                detail: `${product.name} agregado al carrito`,
                life: 2000
            });
        } catch (error) {
            const errorMsg = error instanceof Error
                ? error.message
                : 'No se pudo agregar al carrito';

            this.cartState.setError(errorMsg);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMsg
            });
        } finally {
            this.cartState.setLoading(false);
        }
    }

    /**
     * Determina la severidad del tag de stock
     */
    getStockSeverity(product: Product): 'success' | 'warning' | 'danger' {
        if (product.stock === 0) return 'danger';
        if (product.stock < 10) return 'warning';
        return 'success';
    }

    /**
     * Obtiene el texto del tag de stock
     */
    getStockLabel(product: Product): string {
        if (product.stock === 0) return 'Agotado';
        if (product.stock < 10) return 'Poco Stock';
        return 'Disponible';
    }
}