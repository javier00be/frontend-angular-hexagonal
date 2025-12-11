import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// PrimeNG Imports - Usando DrawerModule
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';

// Hexagonal Signals
import { CartStateService } from '../../state/cart-state.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        DrawerModule,
        MenuModule,
        ButtonModule,
        AvatarModule
    ],
    templateUrl: './app-sidebar.component.html',
    styleUrl: './app-sidebar.component.css'
})
export class AppSidebarComponent {
    // Signal para controlar visibilidad del sidebar
    visible = signal(false);

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
                routerLink: '/',
                command: () => this.closeSidebar()
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
                        routerLink: '/productos',
                        command: () => this.closeSidebar()
                    },
                    {
                        label: 'Nuevos',
                        icon: 'pi pi-star',
                        routerLink: '/productos/nuevos',
                        command: () => this.closeSidebar()
                    },
                    {
                        label: 'Ofertas',
                        icon: 'pi pi-tag',
                        routerLink: '/productos/ofertas',
                        command: () => this.closeSidebar()
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
                        routerLink: '/materiales/inventario',
                        command: () => this.closeSidebar()
                    },
                    {
                        label: 'Proveedores',
                        icon: 'pi pi-users',
                        routerLink: '/materiales/proveedores',
                        command: () => this.closeSidebar()
                    },
                    {
                        label: 'Órdenes',
                        icon: 'pi pi-file',
                        routerLink: '/materiales/ordenes',
                        command: () => this.closeSidebar()
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
                badgeClass: 'p-badge-danger',
                command: () => this.closeSidebar()
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
                        command: () => this.closeSidebar()
                    },
                    {
                        label: 'Tema',
                        icon: 'pi pi-palette',
                        command: () => this.closeSidebar()
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Cerrar Sesión',
                        icon: 'pi pi-sign-out',
                        command: () => this.closeSidebar()
                    }
                ]
            }
        ];
    }

    toggle(): void {
        this.visible.update(v => !v);
    }

    open(): void {
        this.visible.set(true);
    }

    close(): void {
        this.visible.set(false);
    }

    private closeSidebar(): void {
        this.visible.set(false);
    }
}
