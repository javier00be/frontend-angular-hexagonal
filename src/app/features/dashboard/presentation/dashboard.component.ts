import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { Card } from 'primeng/card';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';

// Hexagonal Imports
import { GetDashboardStatsUseCase } from '../../../core/application/dashboard/get-dashboard-stats.usecase';
import { GetSalesChartUseCase } from '../../../core/application/dashboard/get-sales-chart.usecase';
import { DashboardStateService } from '../../../shared/presentation/state/dashboard-state.service';

// Components
import { StatsCardComponent } from './components/stats-card/stats-card.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        Card,
        ProgressSpinner,
        Message,
        Tag,
        StatsCardComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

    constructor(
        private getDashboardStats: GetDashboardStatsUseCase,
        private getSalesChart: GetSalesChartUseCase,
        public dashboardState: DashboardStateService
    ) { }

    async ngOnInit() {
        await this.loadDashboardData();
    }

    /**
     * Carga los datos del dashboard
     */
    async loadDashboardData() {
        this.dashboardState.setLoading(true);
        this.dashboardState.setError(null);

        try {
            // Cargar estadísticas
            const stats = await this.getDashboardStats.execute();
            this.dashboardState.setStats(stats);

            // Cargar gráfico de ventas (mensual por defecto)
            const chartData = await this.getSalesChart.execute('monthly');
            this.dashboardState.setChartData(chartData);
        } catch (error) {
            const errorMsg = error instanceof Error
                ? error.message
                : 'No se pudieron cargar los datos del dashboard';

            this.dashboardState.setError(errorMsg);
        } finally {
            this.dashboardState.setLoading(false);
        }
    }

    /**
     * Determina la severidad del tag de estado de orden
     */
    getOrderStatusSeverity(status: string): 'success' | 'warn' | 'danger' {
        switch (status) {
            case 'completed': return 'success';
            case 'pending': return 'warn';
            case 'cancelled': return 'danger';
            default: return 'warn';
        }
    }

    /**
     * Obtiene el label del estado de orden
     */
    getOrderStatusLabel(status: string): string {
        switch (status) {
            case 'completed': return 'Completado';
            case 'pending': return 'Pendiente';
            case 'cancelled': return 'Cancelado';
            default: return status;
        }
    }

    /**
     * Formatea una fecha
     */
    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Formatea un número como moneda
     */
    formatCurrency(amount: number): string {
        return `$${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
}
