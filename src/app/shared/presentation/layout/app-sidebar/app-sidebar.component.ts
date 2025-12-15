import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
        RouterModule,
        MenuModule,
        AvatarModule
    ],
    templateUrl: './app-sidebar.component.html',
    styleUrl: './app-sidebar.component.css'
})
export class AppSidebarComponent {
    // Menú de navegación
    menuItems: MenuItem[] = [];

    constructor(
        public cartState: CartStateService,
        private router: Router
    ) {
        this.initializeMenu();
    }

    private initializeMenu(): void {
        this.menuItems = [
            {
                label: 'Dashboard',
                icon: 'pi pi-chart-line',
                items: [
                    {
                        label: 'Inicio',
                        icon: 'pi pi-home',
                        routerLink: '/dashboard'
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Productos',
                icon: 'pi pi-box',
                items: [
                    {
                        label: 'Lista de Productos',
                        icon: 'pi pi-list',
                        routerLink: '/productos-admin'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Categorías',
                        icon: 'pi pi-tags',
                        routerLink: '/productos/categorias'
                    },
                    {
                        label: 'Marcas',
                        icon: 'pi pi-bookmark',
                        routerLink: '/productos/marcas'
                    },
                    {
                        label: 'Telas',
                        icon: 'pi pi-palette',
                        routerLink: '/productos/telas'
                    },
                    {
                        label: 'Materiales',
                        icon: 'pi pi-box',
                        routerLink: '/productos/materiales'
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Órdenes',
                icon: 'pi pi-shopping-cart',
                items: [
                    {
                        label: 'Todas',
                        icon: 'pi pi-list',
                        routerLink: '/ordenes'
                    },
                    {
                        label: 'Pendientes',
                        icon: 'pi pi-clock',
                        routerLink: '/ordenes/pendientes'
                    },
                    {
                        label: 'Completadas',
                        icon: 'pi pi-check',
                        routerLink: '/ordenes/completadas'
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
                        icon: 'pi pi-user',
                        routerLink: '/perfil'
                    },
                    {
                        label: 'Temas',
                        icon: 'pi pi-palette',
                        routerLink: '/configuracion/temas'
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
