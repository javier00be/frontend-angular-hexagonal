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
        console.log('🟢 [ProductListComponent] Iniciando carga de productos...');
        this.productState.setLoading(true);
        this.productState.setError(null);

        try {
            console.log('🟢 [ProductListComponent] Ejecutando caso de uso GetAllProducts...');
            const products = await this.getAllProducts.execute();

            console.log('✅ [ProductListComponent] Productos obtenidos exitosamente:', products);
            console.log('📊 [ProductListComponent] Cantidad de productos:', products.length);

            this.productState.setProducts(products);

            console.log('✅ [ProductListComponent] Estado actualizado con los productos');
        } catch (error) {
            const errorMsg = error instanceof Error
                ? error.message
                : 'No se pudieron cargar los productos';

            console.error('❌ [ProductListComponent] Error al cargar productos:', error);
            console.error('📝 [ProductListComponent] Mensaje de error:', errorMsg);

            this.productState.setError(errorMsg);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMsg
            });
        } finally {
            this.productState.setLoading(false);
            console.log('🏁 [ProductListComponent] Carga de productos finalizada');
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
                detail: `${product.nombre} agregado al carrito`,
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
        if (product.cantidad === 0) return 'danger';
        if (product.cantidad < 10) return 'warning';
        return 'success';
    }

    /**
     * Obtiene el texto del tag de stock
     */
    getStockLabel(product: Product): string {
        if (product.cantidad === 0) return 'Agotado';
        if (product.cantidad < 10) return 'Poco Stock';
        return 'Disponible';
    }
}