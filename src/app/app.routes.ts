import { Routes } from '@angular/router';
import { AppSimpleLayoutComponent } from './shared/presentation/layout/app-simple-layout/app-simple-layout.component';
import { AppLayoutComponent } from './shared/presentation/layout/app-layout/app-layout.component';
import { AppDashboardLayoutComponent } from './shared/presentation/layout/app-dashboard-layout/app-dashboard-layout.component';
import { HomeComponent } from './features/home/presentation/home.component';
import { ProductListComponent } from './features/catalog/presentation/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        component: AppSimpleLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                title: 'HexaShop - Inicio'
            }
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'productos',
                component: ProductListComponent,
                title: 'HexaShop - Productos'
            }
        ]
    },
    {
        path: '',
        component: AppDashboardLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/presentation/dashboard.component').then(m => m.DashboardComponent),
                title: 'HexaShop - Dashboard'
            },
            {
                path: 'productos-admin',
                loadComponent: () => import('./features/catalog/presentation/product-admin/product-admin.component').then(m => m.ProductAdminComponent),
                title: 'HexaShop - Gestión de Productos'
            },
            {
                path: 'marcas',
                loadComponent: () => import('./features/catalog/presentation/brand-admin/brand-admin.component').then(m => m.BrandAdminComponent),
                title: 'HexaShop - Gestión de Marcas'
            },
            {
                path: 'categorias',
                loadComponent: () => import('./features/catalog/presentation/category-admin/category-admin.component').then(m => m.CategoryAdminComponent),
                title: 'HexaShop - Gestión de Categorías'
            },
            {
                path: 'telas',
                loadComponent: () => import('./features/catalog/presentation/fabric-admin/fabric-admin.component').then(m => m.FabricAdminComponent),
                title: 'HexaShop - Gestión de Telas'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
