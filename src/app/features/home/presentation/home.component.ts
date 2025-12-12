import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from '../../../shared/presentation/layout/app-footer/app-footer.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, AppFooterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
    mouseX = 0;
    mouseY = 0;

    // Drag to scroll variables
    private isDragging = false;
    private startX = 0;
    private scrollLeft = 0;
    private currentContainer: HTMLElement | null = null;

    // Auto-scroll variables
    @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;
    private autoScrollInterval: any;
    private autoScrollSpeed = 1; // pixels per interval
    private autoScrollDelay = 30; // milliseconds between scroll steps
    private pauseAutoScroll = false;

    @HostListener('document:mousemove', ['$event'])
    onDocumentMouseMove(e: MouseEvent) {
        // Update cursor position for liquid glass cursor
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    ngAfterViewInit() {
        this.startAutoScroll();
    }

    ngOnDestroy() {
        this.stopAutoScroll();
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            if (!this.pauseAutoScroll && this.carouselContainer) {
                const container = this.carouselContainer.nativeElement;

                // Check if we've reached the end
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                    // Reset to beginning
                    container.scrollLeft = 0;
                } else {
                    // Continue scrolling
                    container.scrollLeft += this.autoScrollSpeed;
                }
            }
        }, this.autoScrollDelay);
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
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
        this.pauseAutoScroll = true; // Pause auto-scroll when user interacts
    }

    onMouseUp() {
        this.isDragging = false;
        this.currentContainer = null;
        // Resume auto-scroll after 3 seconds of no interaction
        setTimeout(() => {
            this.pauseAutoScroll = false;
        }, 3000);
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

    testimonials = [
        {
            name: 'Carlos Mendoza',
            role: 'CEO, Tech Solutions',
            comment: 'La calidad de los trajes es excepcional. El ajuste perfecto y la atención al detalle superaron mis expectativas. Definitivamente volveré a comprar.',
            rating: 5,
            avatar: 'CM'
        },
        {
            name: 'Ana García',
            role: 'Directora de Marketing',
            comment: 'Excelente servicio y productos de primera calidad. El equipo fue muy profesional y me ayudaron a encontrar exactamente lo que buscaba.',
            rating: 5,
            avatar: 'AG'
        },
        {
            name: 'Roberto Silva',
            role: 'Empresario',
            comment: 'Impresionante colección de trajes. La elegancia y el estilo son incomparables. Muy recomendado para profesionales que buscan calidad.',
            rating: 5,
            avatar: 'RS'
        },
        {
            name: 'María López',
            role: 'Consultora',
            comment: 'Me encanta la variedad y la calidad de los productos. El proceso de compra fue sencillo y el resultado final superó mis expectativas.',
            rating: 5,
            avatar: 'ML'
        }
    ];
}
