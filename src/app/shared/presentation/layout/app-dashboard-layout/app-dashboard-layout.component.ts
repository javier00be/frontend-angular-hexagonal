import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [RouterOutlet, AppSidebarComponent],
    templateUrl: './app-dashboard-layout.component.html',
    styleUrl: './app-dashboard-layout.component.css'
})
export class AppDashboardLayoutComponent { }
