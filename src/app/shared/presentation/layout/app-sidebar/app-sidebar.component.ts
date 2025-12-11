import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';

// Hexagonal Signals
import { CartStateService } from '../../state/cart-state.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        MenuModule,
        AvatarModule
    ],
    templateUrl: './app-sidebar.component.html',
    styleUrl: './app-sidebar.component.css'
})
export class AppSidebarComponent {
    // Menú de navegación
    menuItems: MenuItem[] = [];

    constructor(public cartState: CartStateService) {
        this.initializeMenu();
    }

    private initializeMenu(): void {
        this.menuItems = [
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                routerLink: '/'
            },
            {
                separator: true
            },
            {
                label: 'Productos',
                icon: 'pi pi-shopping-bag',
                items: [
                    {
                        label: 'Catálogo',
                        icon: 'pi pi-list',
                        routerLink: '/productos'
                    },
                    {
                        label: 'Nuevos',
                        icon: 'pi pi-star',
                        routerLink: '/productos/nuevos'
                    },
                    {
                        label: 'Ofertas',
                        icon: 'pi pi-tag',
                        routerLink: '/productos/ofertas'
                    }
                ]
            },
            {
                label: 'Materiales',
                icon: 'pi pi-box',
                items: [
                    {
                        label: 'Inventario',
                        icon: 'pi pi-database',
                        routerLink: '/materiales/inventario'
                    },
                    {
                        label: 'Proveedores',
                        icon: 'pi pi-users',
                        routerLink: '/materiales/proveedores'
                    },
                    {
                        label: 'Órdenes',
                        icon: 'pi pi-file',
                        routerLink: '/materiales/ordenes'
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Carrito',
                icon: 'pi pi-shopping-cart',
                routerLink: '/carrito',
                badge: this.cartState.itemCount().toString(),
                badgeClass: 'p-badge-danger'
            },
            {
                separator: true
            },
            {
                label: 'Configuración',
                icon: 'pi pi-cog',
                items: [
                    {
                        label: 'Perfil',
                        icon: 'pi pi-user'
                    },
                    {
                        label: 'Tema',
                        icon: 'pi pi-palette'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Cerrar Sesión',
                        icon: 'pi pi-sign-out'
                    }
                ]
            }
        ];
    }
}
