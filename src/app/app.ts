import { Component } from '@angular/core';

// Layout Component
import { AppLayoutComponent } from './shared/presentation/layout/app-layout/app-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppLayoutComponent
  ],
  template: `<app-layout></app-layout>`
})
export class App {
  // La lógica de la aplicación se maneja en los componentes de las Features/Presentation.
}