import { Component, HostListener } from '@angular/core';
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
  isScrolled = false;

  constructor(public cartState: CartStateService) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Change header background when scrolled more than 50px
    this.isScrolled = window.scrollY > 50;
  }
}