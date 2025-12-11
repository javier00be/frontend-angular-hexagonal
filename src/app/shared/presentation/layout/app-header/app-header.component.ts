import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// PrimeNG Imports
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

// Hexagonal Signals
import { CartStateService } from '../../state/cart-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    BadgeModule,
    InputTextModule,
    AvatarModule
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  @Output() menuClick = new EventEmitter<void>();

  constructor(public cartState: CartStateService) { }

  onMenuClick(): void {
    this.menuClick.emit();
  }
}