import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Layout Components
import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        AppHeaderComponent,
        AppSidebarComponent
    ],
    templateUrl: './app-layout.component.html',
    styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
    @ViewChild(AppSidebarComponent) sidebar!: AppSidebarComponent;

    toggleSidebar(): void {
        this.sidebar.toggle();
    }
}
