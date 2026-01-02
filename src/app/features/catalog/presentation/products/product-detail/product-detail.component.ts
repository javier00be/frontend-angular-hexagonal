import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Tabs } from 'primeng/tabs';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

// Hexagonal Imports
import { Product } from '../../../../../core/domain/product/product.model';
import { GetProductByIdUseCase } from '../../../../../core/application/product/get-product-by-id.usecase';
import { GetAllProductsUseCase } from '../../../../../core/application/product/get-all-products.usecase';
import { RecommendedProductsComponent } from '../../../../../shared/presentation/components/recommended-products/recommended-products.component';
import { AppFooterComponent } from '../../../../../shared/presentation/layout/app-footer/app-footer.component';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        Tag,
        ProgressSpinner,
        Message,
        Breadcrumb,
        RecommendedProductsComponent,
        AppFooterComponent
    ],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;
    relatedProducts: Product[] = [];
    isLoading: boolean = true;
    error: string | null = null;
    quantity: number = 1;

    // Breadcrumb
    breadcrumbItems: MenuItem[] = [];
    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private getProductById: GetProductByIdUseCase,
        private getAllProducts: GetAllProductsUseCase,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const sku = this.route.snapshot.paramMap.get('sku');
        if (sku) {
            this.loadProduct(sku);
            this.loadRelatedProducts();
        } else {
            this.error = 'SKU de producto no válido';
            this.isLoading = false;
            this.cdr.detectChanges();
        }
    }

    /**
     * Carga el producto por SKU
     */
    async loadProduct(sku: string) {
        this.isLoading = true;
        this.error = null;

        try {
            this.product = await this.getProductById.execute(sku);
            if (!this.product) {
                this.error = 'Producto no encontrado';
            } else {
                // Configurar breadcrumb
                this.breadcrumbItems = [
                    { label: 'Productos', routerLink: '/productos' },
                    { label: this.product.nombre }
                ];
            }
        } catch (error) {
            this.error = error instanceof Error
                ? error.message
                : 'Error al cargar el producto';
        } finally {
            this.isLoading = false;
            this.cdr.detectChanges();
        }
    }

    /**
     * Carga productos relacionados (aleatorios)
     * Si falla, simplemente no muestra productos relacionados
     */
    async loadRelatedProducts() {
        try {
            const allProducts = await this.getAllProducts.execute();
            // Filtrar el producto actual y tomar 6 aleatorios
            const filtered = allProducts.filter(p => p.id !== this.product?.id);
            const shuffled = [...filtered].sort(() => 0.5 - Math.random());
            this.relatedProducts = shuffled.slice(0, 6);
        } catch (error) {
            // No es crítico si falla la carga de productos relacionados
            console.warn('No se pudieron cargar productos relacionados:', error);
            this.relatedProducts = [];
        }
    }

    /**
     * Incrementa la cantidad
     */
    incrementQuantity() {
        if (this.product && this.quantity < this.product.cantidad) {
            this.quantity++;
        }
    }

    /**
     * Decrementa la cantidad
     */
    decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
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
     * Agrega producto al carrito
     */
    addToCart() {
        console.log('Agregar al carrito:', this.product, 'Cantidad:', this.quantity);
        // TODO: Implementar funcionalidad de carrito
    }

    /**
     * Compra inmediata
     */
    buyNow() {
        console.log('Comprar ahora:', this.product, 'Cantidad:', this.quantity);
        // TODO: Implementar funcionalidad de compra
    }

    /**
     * Navega de vuelta a la lista de productos
     */
    goBack() {
        this.router.navigate(['/products']);
    }
}
