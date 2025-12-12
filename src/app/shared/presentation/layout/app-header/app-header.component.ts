import { Component, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { PopoverModule } from 'primeng/popover';
import { PasswordModule } from 'primeng/password';
import { Popover } from 'primeng/popover';

// Hexagonal Signals
import { CartStateService } from '../../state/cart-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    BadgeModule,
    InputTextModule,
    AvatarModule,
    PopoverModule,
    PasswordModule
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  isScrolled = false;

  // Login form data
  loginEmail = '';
  loginPassword = '';

  @ViewChild('loginPopover') loginPopover!: Popover;

  constructor(public cartState: CartStateService) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Change header background when scrolled more than 50px
    this.isScrolled = window.scrollY > 50;

    // Close popover when scrolling to prevent misalignment
    if (this.loginPopover && this.loginPopover.overlayVisible) {
      this.loginPopover.hide();
    }
  }

  onLogin() {
    console.log('Login attempt:', { email: this.loginEmail, password: '***' });
    // Aquí puedes agregar la lógica de autenticación
    if (this.loginPopover) {
      this.loginPopover.hide();
    }
  }
}
