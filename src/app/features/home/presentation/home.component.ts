import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    mouseX = 0;
    mouseY = 0;

    // Drag to scroll variables
    private isDragging = false;
    private startX = 0;
    private scrollLeft = 0;
    private currentContainer: HTMLElement | null = null;

    @HostListener('document:mousemove', ['$event'])
    onDocumentMouseMove(e: MouseEvent) {
        // Update cursor position for liquid glass cursor
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    onMouseMove(e: MouseEvent) {
        if (!this.isDragging || !this.currentContainer) return;
        
        e.preventDefault();
        const x = e.pageX - this.currentContainer.offsetLeft;
        const walk = (x - this.startX) * 2.5; // Scroll speed multiplier
        this.currentContainer.scrollLeft = this.scrollLeft - walk;
    }

    onMouseDown(e: MouseEvent, container: HTMLElement) {
        this.isDragging = true;
        this.currentContainer = container;
        this.startX = e.pageX - container.offsetLeft;
        this.scrollLeft = container.scrollLeft;
    }

    onMouseUp() {
        this.isDragging = false;
        this.currentContainer = null;
    }

    products = [
        { name: 'Northern Star Trousers', description: 'Classic slim fit', price: '4 599 kr', image: 'assets/images/carrusel1.jpg' },
        { name: 'Harmony Jacket', description: 'Classic slim fit', price: '3 399 kr', image: 'assets/images/carrusel2.jpg' },
        { name: 'Move Jacket', description: 'Sporty relaxed fit', price: '2 999 kr', image: 'assets/images/carrusel3.jpg' },
        { name: 'Work Trousers', description: 'Classic tight fit', price: '2 999 kr', image: 'assets/images/carrusel4.jpg' },
        { name: 'Elegant Suit', description: 'Modern fit', price: '5 100 kr', image: 'assets/images/carrusel5.jpg' },
        { name: 'Casual Blazer', description: 'Comfort fit', price: '3 200 kr', image: 'assets/images/carrusel6.jpg' },
        { name: 'Urban Jacket', description: 'Street style', price: '2 800 kr', image: 'assets/images/carrusel7.jpg' },
        { name: 'Evening Dress', description: 'Elegant wear', price: '6 500 kr', image: 'assets/images/carrusel8.jpg' },
    ];
}
