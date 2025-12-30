import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

// Dominios
import { ProductRepository } from './core/domain/product/product.model';
import { CartRepository } from './core/domain/cart/cart.model';
import { DashboardRepository } from './core/domain/dashboard/dashboard.model';
import { BrandRepository } from './core/domain/brand/brand.model';
import { CategoryRepository } from './core/domain/category/category.model';
import { FabricRepository } from './core/domain/fabric/fabric.model';
import { MaterialRepository } from './core/domain/material/material.model';
import { UserRepository } from './core/domain/user/user.model';

// Casos de Uso - Products
import { GetAllProductsUseCase } from './core/application/product/get-all-products.usecase';
import { CreateProductUseCase } from './core/application/product/create-product.usecase';
import { UpdateProductUseCase } from './core/application/product/update-product.usecase';
// Casos de Uso - Brands
import { GetAllBrandsUseCase } from './core/application/brand/get-all-brands.usecase';
import { CreateBrandUseCase } from './core/application/brand/create-brand.usecase';
import { UpdateBrandUseCase } from './core/application/brand/update-brand.usecase';
import { DeleteBrandUseCase } from './core/application/brand/delete-brand.usecase';
// Casos de Uso - Categories
import { GetAllCategoriesUseCase } from './core/application/category/get-all-categories.usecase';
import { CreateCategoryUseCase } from './core/application/category/create-category.usecase';
import { UpdateCategoryUseCase } from './core/application/category/update-category.usecase';
import { DeleteCategoryUseCase } from './core/application/category/delete-category.usecase';
// Casos de Uso - Fabrics
import { GetAllFabricsUseCase } from './core/application/fabric/get-all-fabrics.usecase';
import { CreateFabricUseCase } from './core/application/fabric/create-fabric.usecase';
import { UpdateFabricUseCase } from './core/application/fabric/update-fabric.usecase';
import { DeleteFabricUseCase } from './core/application/fabric/delete-fabric.usecase';
// Casos de Uso - Materials
import { GetAllMaterialsUseCase } from './core/application/material/get-all-material.usecase';
import { CreateMaterialUseCase } from './core/application/material/create-material.usecase';
import { UpdateMaterialUseCase } from './core/application/material/update-material.usecase';
import { DeleteMaterialUseCase } from './core/application/material/delete-material.usecase';
// Casos de Uso - Users
import { GetAllUsersUseCase } from './core/application/user/get-all-users.usecase';
import { CreateUserUseCase } from './core/application/user/create-user.usecase';
import { UpdateUserUseCase } from './core/application/user/update-user.usecase';
import { DeleteUserUseCase } from './core/application/user/delete-user.usecase';
// Casos de Uso - Others
import { AddToCartUseCase } from './core/application/cart/add-to-cart.usecase';
import { GetDashboardStatsUseCase } from './core/application/dashboard/get-dashboard-stats.usecase';
import { GetSalesChartUseCase } from './core/application/dashboard/get-sales-chart.usecase';

// Adaptadores
import { ProductHttpAdapter } from './features/catalog/infrastructure/product-http.adapter';
import { BrandHttpAdapter } from './features/catalog/infrastructure/brand-http.adapter';
import { CategoryHttpAdapter } from './features/catalog/infrastructure/category-http.adapter';
import { FabricHttpAdapter } from './features/catalog/infrastructure/fabric-http.adapter';
import { MaterialHttpAdapter } from './features/catalog/infrastructure/material-http.adapter';

import { CartInMemoryAdapter } from './features/cart/infrastructure/cart-in-memory.adapter';
import { DashboardMockAdapter } from './features/dashboard/infrastructure/dashboard-mock.adapter';

import { routes } from './app.routes'; // Necesitas crear este archivo
import { UserHttpAdapter } from './features/catalog/infrastructure/user-http.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),

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
    { provide: ProductRepository, useClass: ProductHttpAdapter },
    { provide: BrandRepository, useClass: BrandHttpAdapter },
    { provide: CategoryRepository, useClass: CategoryHttpAdapter },
    { provide: FabricRepository, useClass: FabricHttpAdapter },
    { provide: MaterialRepository, useClass: MaterialHttpAdapter },
    { provide: UserRepository, useClass: UserHttpAdapter },
    { provide: CartRepository, useClass: CartInMemoryAdapter },
    { provide: DashboardRepository, useClass: DashboardMockAdapter },

    // 2. Casos de Uso (Se inyectan las interfaces/Puertos)
    {
      provide: GetAllProductsUseCase,
      useFactory: (repo: ProductRepository) => new GetAllProductsUseCase(repo),
      deps: [ProductRepository],
    },
    {
      provide: CreateProductUseCase,
      useFactory: (repo: ProductRepository) => new CreateProductUseCase(repo),
      deps: [ProductRepository],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (repo: ProductRepository) => new UpdateProductUseCase(repo),
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

    // Casos de Uso - Brands
    { provide: GetAllBrandsUseCase, useFactory: (repo: BrandRepository) => new GetAllBrandsUseCase(repo), deps: [BrandRepository] },
    { provide: CreateBrandUseCase, useFactory: (repo: BrandRepository) => new CreateBrandUseCase(repo), deps: [BrandRepository] },
    { provide: UpdateBrandUseCase, useFactory: (repo: BrandRepository) => new UpdateBrandUseCase(repo), deps: [BrandRepository] },
    { provide: DeleteBrandUseCase, useFactory: (repo: BrandRepository) => new DeleteBrandUseCase(repo), deps: [BrandRepository] },

    // Casos de Uso - Categories
    { provide: GetAllCategoriesUseCase, useFactory: (repo: CategoryRepository) => new GetAllCategoriesUseCase(repo), deps: [CategoryRepository] },
    { provide: CreateCategoryUseCase, useFactory: (repo: CategoryRepository) => new CreateCategoryUseCase(repo), deps: [CategoryRepository] },
    { provide: UpdateCategoryUseCase, useFactory: (repo: CategoryRepository) => new UpdateCategoryUseCase(repo), deps: [CategoryRepository] },
    { provide: DeleteCategoryUseCase, useFactory: (repo: CategoryRepository) => new DeleteCategoryUseCase(repo), deps: [CategoryRepository] },

    // Casos de Uso - Fabrics
    { provide: GetAllFabricsUseCase, useFactory: (repo: FabricRepository) => new GetAllFabricsUseCase(repo), deps: [FabricRepository] },
    { provide: CreateFabricUseCase, useFactory: (repo: FabricRepository) => new CreateFabricUseCase(repo), deps: [FabricRepository] },
    { provide: UpdateFabricUseCase, useFactory: (repo: FabricRepository) => new UpdateFabricUseCase(repo), deps: [FabricRepository] },
    { provide: DeleteFabricUseCase, useFactory: (repo: FabricRepository) => new DeleteFabricUseCase(repo), deps: [FabricRepository] },

    // Casos de Uso - Materials
    { provide: GetAllMaterialsUseCase, useFactory: (repo: MaterialRepository) => new GetAllMaterialsUseCase(repo), deps: [MaterialRepository] },
    { provide: CreateMaterialUseCase, useFactory: (repo: MaterialRepository) => new CreateMaterialUseCase(repo), deps: [MaterialRepository] },
    { provide: UpdateMaterialUseCase, useFactory: (repo: MaterialRepository) => new UpdateMaterialUseCase(repo), deps: [MaterialRepository] },
    { provide: DeleteMaterialUseCase, useFactory: (repo: MaterialRepository) => new DeleteMaterialUseCase(repo), deps: [MaterialRepository] },

    // Casos de Uso - Users
    { provide: GetAllUsersUseCase, useFactory: (repo: UserRepository) => new GetAllUsersUseCase(repo), deps: [UserRepository] },
    { provide: CreateUserUseCase, useFactory: (repo: UserRepository) => new CreateUserUseCase(repo), deps: [UserRepository] },
    { provide: UpdateUserUseCase, useFactory: (repo: UserRepository) => new UpdateUserUseCase(repo), deps: [UserRepository] },
    { provide: DeleteUserUseCase, useFactory: (repo: UserRepository) => new DeleteUserUseCase(repo), deps: [UserRepository] },

    // El resto de los servicios de Angular (MessageService) se proveen localmente o en el root.
  ],
};