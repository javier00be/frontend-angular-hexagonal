import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Layout Components
import { AppHeaderComponent } from '../app-header/app-header.component';

@Component({
    selector: 'app-simple-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        AppHeaderComponent
    ],
    templateUrl: './app-simple-layout.component.html',
    styleUrl: './app-simple-layout.component.css'
})
export class AppSimpleLayoutComponent {
    // Layout simple - solo header, sin sidebar
}
