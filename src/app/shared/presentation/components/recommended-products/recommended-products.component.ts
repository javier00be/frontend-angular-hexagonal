import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Imports
import { Tag } from 'primeng/tag';

// Hexagonal Imports
import { Product } from '../../../../core/domain/product/product.model';

@Component({
    selector: 'app-recommended-products',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        Tag
    ],
    templateUrl: './recommended-products.component.html',
    styleUrl: './recommended-products.component.css'
})
export class RecommendedProductsComponent {
    /**
     * Lista de productos a mostrar en la sección de recomendados
     */
    @Input() products: Product[] = [];

    /**
     * Título de la sección (personalizable)
     */
    @Input() title: string = 'Productos Recomendados';

    /**
     * Subtítulo de la sección (personalizable)
     */
    @Input() subtitle: string = 'Descubre productos que podrían interesarte';

    /**
     * Mostrar o ocultar el botón "Ver todos"
     */
    @Input() showViewAllButton: boolean = true;

    /**
     * Número máximo de productos a mostrar
     */
    @Input() maxProducts: number = 6;

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
     * Obtiene los productos limitados al máximo configurado
     */
    get displayProducts(): Product[] {
        return this.products.slice(0, this.maxProducts);
    }

    /**
     * Maneja el click en "Ver todos"
     */
    onViewAllClick(): void {
        // TODO: Implementar navegación o emitir evento
        console.log('Ver todos los productos');
    }

    /**
     * Maneja el click en "Agregar al carrito"
     */
    onAddToCart(product: Product): void {
        // TODO: Implementar funcionalidad de carrito o emitir evento
        console.log('Agregar al carrito:', product);
    }
}
