import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

// Dominios
import { ProductRepository } from './core/domain/product/product.model';
import { CartRepository } from './core/domain/cart/cart.model';
import { DashboardRepository } from './core/domain/dashboard/dashboard.model';

// Casos de Uso
import { GetAllProductsUseCase } from './core/application/product/get-all-products.usecase';
import { AddToCartUseCase } from './core/application/cart/add-to-cart.usecase';
import { GetDashboardStatsUseCase } from './core/application/dashboard/get-dashboard-stats.usecase';
import { GetSalesChartUseCase } from './core/application/dashboard/get-sales-chart.usecase';

// Adaptadores
import { ProductMockAdapter } from './features/catalog/infrastructure/product-mock.adapter';
import { CartInMemoryAdapter } from './features/cart/infrastructure/cart-in-memory.adapter';
import { DashboardMockAdapter } from './features/dashboard/infrastructure/dashboard-mock.adapter';

import { routes } from './app.routes'; // Necesitas crear este archivo

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // Configuración de PrimeNG con tema Aura
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode' // Opcional: para modo oscuro
        }
      }
    }),

    // ----------------------------------------------------
    // CABLEADO HEXAGONAL: Conexión de Puertos con Adaptadores
    // ----------------------------------------------------

    // 1. Adaptadores de Infraestructura (Implementación de Puertos)
    { provide: ProductRepository, useClass: ProductMockAdapter },
    { provide: CartRepository, useClass: CartInMemoryAdapter },
    { provide: DashboardRepository, useClass: DashboardMockAdapter },

    // 2. Casos de Uso (Se inyectan las interfaces/Puertos)
    {
      provide: GetAllProductsUseCase,
      useFactory: (repo: ProductRepository) => new GetAllProductsUseCase(repo),
      deps: [ProductRepository],
    },
    {
      provide: AddToCartUseCase,
      useFactory: (repo: CartRepository) => new AddToCartUseCase(repo),
      deps: [CartRepository],
    },
    {
      provide: GetDashboardStatsUseCase,
      useFactory: (repo: DashboardRepository) => new GetDashboardStatsUseCase(repo),
      deps: [DashboardRepository],
    },
    {
      provide: GetSalesChartUseCase,
      useFactory: (repo: DashboardRepository) => new GetSalesChartUseCase(repo),
      deps: [DashboardRepository],
    },

    // El resto de los servicios de Angular (MessageService) se proveen localmente o en el root.
  ],
};