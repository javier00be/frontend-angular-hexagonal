import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
    DashboardRepository,
    DashboardStats,
    SalesChartData
} from '../../../core/domain/dashboard/dashboard.model';

@Injectable()
export class DashboardHttpAdapter extends DashboardRepository {
    private readonly API_URL = 'http://localhost:3000/api/dashboard';

    constructor(private http: HttpClient) {
        super();
    }

    /**
     * Obtiene estadísticas del dashboard desde la API REST
     */
    async getStats(): Promise<DashboardStats> {
        try {
            return await firstValueFrom(
                this.http.get<DashboardStats>(`${this.API_URL}/stats`)
            );
        } catch (error) {
            console.error('Error al obtener estadísticas del dashboard:', error);
            throw new Error('No se pudieron cargar las estadísticas del dashboard');
        }
    }

    /**
     * Obtiene datos del gráfico de ventas desde la API REST
     * @param period - Período de tiempo (daily, weekly, monthly)
     */
    async getSalesChart(period: 'daily' | 'weekly' | 'monthly'): Promise<SalesChartData> {
        try {
            return await firstValueFrom(
                this.http.get<SalesChartData>(`${this.API_URL}/sales-chart`, {
                    params: { period }
                })
            );
        } catch (error) {
            console.error('Error al obtener datos del gráfico de ventas:', error);
            throw new Error('No se pudieron cargar los datos del gráfico');
        }
    }
}
