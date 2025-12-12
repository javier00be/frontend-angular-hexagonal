import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { DashboardStats, SalesChartData } from '../../../core/domain/dashboard/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardStateService {
    // Estado privado de estadísticas
    private statsSignal: WritableSignal<DashboardStats | null> = signal(null);

    // Estado de datos del gráfico
    private chartDataSignal: WritableSignal<SalesChartData | null> = signal(null);

    // Estado de carga
    private loadingSignal: WritableSignal<boolean> = signal(false);

    // Estado de error
    private errorSignal: WritableSignal<string | null> = signal(null);

    // Signals públicos readonly
    public readonly stats: Signal<DashboardStats | null> = this.statsSignal.asReadonly();
    public readonly chartData: Signal<SalesChartData | null> = this.chartDataSignal.asReadonly();
    public readonly isLoading: Signal<boolean> = this.loadingSignal.asReadonly();
    public readonly error: Signal<string | null> = this.errorSignal.asReadonly();

    // Computed: Total de ventas formateado
    public readonly totalSalesFormatted: Signal<string> = computed(() => {
        const stats = this.stats();
        if (!stats) return '$0.00';
        return `$${stats.totalSales.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    });

    // Computed: Tiene datos
    public readonly hasData: Signal<boolean> = computed(() =>
        this.stats() !== null
    );

    // Computed: Productos con bajo stock
    public readonly lowStockCount: Signal<number> = computed(() => {
        const stats = this.stats();
        return stats?.lowStockProducts.length ?? 0;
    });

    // Métodos públicos
    setStats(stats: DashboardStats): void {
        this.statsSignal.set(stats);
        this.errorSignal.set(null);
    }

    setChartData(chartData: SalesChartData): void {
        this.chartDataSignal.set(chartData);
    }

    setLoading(loading: boolean): void {
        this.loadingSignal.set(loading);
    }

    setError(error: string | null): void {
        this.errorSignal.set(error);
    }

    clearData(): void {
        this.statsSignal.set(null);
        this.chartDataSignal.set(null);
        this.errorSignal.set(null);
    }
}
