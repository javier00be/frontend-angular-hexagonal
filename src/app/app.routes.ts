import { Routes } from '@angular/router';
import { ProductListComponent } from './features/catalog/presentation/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductListComponent,
        title: 'HexaShop - Catálogo de Productos'
    },
    {
        path: 'productos',
        component: ProductListComponent,
        title: 'HexaShop - Productos'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
