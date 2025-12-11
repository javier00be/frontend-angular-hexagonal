import { Routes } from '@angular/router';
import { AppSimpleLayoutComponent } from './shared/presentation/layout/app-simple-layout/app-simple-layout.component';
import { AppLayoutComponent } from './shared/presentation/layout/app-layout/app-layout.component';
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
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
