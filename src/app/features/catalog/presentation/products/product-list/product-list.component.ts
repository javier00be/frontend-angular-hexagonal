import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Imports
import { DataViewModule } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { SelectButton } from 'primeng/selectbutton';

// Hexagonal Imports
import { Product } from '../../../../../core/domain/product/product.model';
import { GetAllProductsUseCase } from '../../../../../core/application/product/get-all-products.usecase';
import { ProductStateService } from '../../../../../shared/presentation/state/product-state.service';
import { FilterSidebar, FilterConfig, FilterState } from '../../../../../shared/presentation/components/filter-sidebar/filter-sidebar';
import { RecommendedProductsComponent } from '../../../../../shared/presentation/components/recommended-products/recommended-products.component';
import { AppFooterComponent } from '../../../../../shared/presentation/layout/app-footer/app-footer.component';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DataViewModule,
        Tag,
        ProgressSpinner,
        Message,
        SelectButton,
        FilterSidebar,
        RecommendedProductsComponent,
        AppFooterComponent
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
    searchValue: string = '';
    layout: 'list' | 'grid' = 'grid';
    filteredProducts: Product[] = [];
    recommendedProducts: Product[] = [];

    layoutOptions = [
        { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' },
        { label: 'Lista', value: 'list', icon: 'pi pi-bars' }
    ];

    // Configuración de filtros
    filterConfig: FilterConfig = {
        categories: [
            { label: 'Todos los Productos', value: 'all', checked: false },
            { label: 'Ropa', value: 'ropa', checked: false },
            { label: 'Calzado', value: 'calzado', checked: false },
            { label: 'Accesorios', value: 'accesorios', checked: false }
        ],
        priceRange: {
            min: 0,
            max: 500
        },
        sortOptions: [
            { label: 'Precio: Menor a Mayor', value: 'price_asc' },
            { label: 'Precio: Mayor a Menor', value: 'price_desc' },
            { label: 'Nombre: A-Z', value: 'name_asc' },
            { label: 'Nombre: Z-A', value: 'name_desc' }
        ]
    };

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
            this.filteredProducts = products; // Inicializar productos filtrados

            // Seleccionar 6 productos aleatorios para recomendados
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            this.recommendedProducts = shuffled.slice(0, 6);
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
     * Maneja los cambios de filtros
     */
    onFilterChange(filterState: FilterState) {
        let filtered = [...this.productState.products()];

        // Filtrar por categorías
        if (filterState.selectedCategories.length > 0 && !filterState.selectedCategories.includes('all')) {
            filtered = filtered.filter(p =>
                filterState.selectedCategories.some(cat =>
                    p.nombre.toLowerCase().includes(cat.toLowerCase())
                )
            );
        }

        // Filtrar por rango de precio
        filtered = filtered.filter(p =>
            p.precio >= filterState.priceRange[0] &&
            p.precio <= filterState.priceRange[1]
        );

        // Ordenar
        switch (filterState.sortBy) {
            case 'price_asc':
                filtered.sort((a, b) => a.precio - b.precio);
                break;
            case 'price_desc':
                filtered.sort((a, b) => b.precio - a.precio);
                break;
            case 'name_asc':
                filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'name_desc':
                filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
        }

        this.filteredProducts = filtered;
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
