import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-stats-card',
    standalone: true,
    imports: [CommonModule, Card],
    template: `
        <p-card [styleClass]="'stats-card ' + colorClass">
            <div class="stats-card-content">
                <div class="stats-icon">
                    <i [class]="icon"></i>
                </div>
                <div class="stats-info">
                    <h3 class="stats-title">{{ title }}</h3>
                    <p class="stats-value">{{ value }}</p>
                    <span class="stats-trend" [class.positive]="trend > 0" [class.negative]="trend < 0" *ngIf="trend !== 0">
                        <i [class]="trend > 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                        {{ Math.abs(trend) }}%
                    </span>
                </div>
            </div>
        </p-card>
    `,
    styles: [`
        .stats-card {
            height: 100%;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .stats-card-content {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .stats-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
        }

        .stats-card.blue .stats-icon {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .stats-card.green .stats-icon {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
        }

        .stats-card.orange .stats-icon {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
        }

        .stats-card.purple .stats-icon {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
        }

        .stats-info {
            flex: 1;
        }

        .stats-title {
            margin: 0;
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .stats-value {
            margin: 0.5rem 0 0.25rem 0;
            font-size: 1.875rem;
            font-weight: 700;
            color: #111827;
        }

        .stats-trend {
            font-size: 0.875rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }

        .stats-trend.positive {
            color: #10b981;
        }

        .stats-trend.negative {
            color: #ef4444;
        }

        .stats-trend i {
            font-size: 0.75rem;
        }
    `]
})
export class StatsCardComponent {
    @Input() title: string = '';
    @Input() value: string | number = '';
    @Input() icon: string = 'pi pi-chart-line';
    @Input() trend: number = 0;
    @Input() colorClass: string = 'blue';

    Math = Math;
}
