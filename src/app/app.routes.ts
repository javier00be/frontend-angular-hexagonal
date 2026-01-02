import { Routes } from '@angular/router';
import { AppSimpleLayoutComponent } from './shared/presentation/layout/app-simple-layout/app-simple-layout.component';
import { AppLayoutComponent } from './shared/presentation/layout/app-layout/app-layout.component';
import { AppDashboardLayoutComponent } from './shared/presentation/layout/app-dashboard-layout/app-dashboard-layout.component';
import { HomeComponent } from './features/home/presentation/home.component';
import { ProductListComponent } from './features/catalog/presentation/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/catalog/presentation/products/product-detail/product-detail.component';


export const routes: Routes = [
    {
        path: '',
        component: AppSimpleLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                title: 'HexaShop - Inicio'
            },
            {
                path: 'productos',
                component: ProductListComponent,
                title: 'HexaShop - Productos'
            },
            {
                path: 'productos/:sku',
                component: ProductDetailComponent,
                title: 'HexaShop - Detalle de Producto'
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
                loadComponent: () => import('./features/catalog/presentation/products/product-admin/product-admin.component').then(m => m.ProductAdminComponent),
                title: 'HexaShop - Gestión de Productos'
            },
            {
                path: 'productos/marcas',
                loadComponent: () => import('./features/catalog/presentation/brands/brand-admin/brand-admin.component').then(m => m.BrandAdminComponent),
                title: 'HexaShop - Gestión de Marcas'
            },
            {
                path: 'productos/categorias',
                loadComponent: () => import('./features/catalog/presentation/categories/category-admin/category-admin.component').then(m => m.CategoryAdminComponent),
                title: 'HexaShop - Gestión de Categorías'
            },
            {
                path: 'productos/telas',
                loadComponent: () => import('./features/catalog/presentation/fabrics/fabric-admin/fabric-admin.component').then(m => m.FabricAdminComponent),
                title: 'HexaShop - Gestión de Telas'
            },
            {
                path: 'productos/materiales',
                loadComponent: () => import('./features/catalog/presentation/material/material-admin/material-admin.component').then(m => m.MaterialAdminComponent),
                title: 'HexaShop - Gestión de Materiales'
            },
            {
                path: 'usuarios',
                loadComponent: () => import('./features/catalog/presentation/user/user-admin/user-admin.component').then(m => m.UserAdminComponent),
                title: 'HexaShop - Gestión de Usuarios'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
