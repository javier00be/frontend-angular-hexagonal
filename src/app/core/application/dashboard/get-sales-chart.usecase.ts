import { Injectable } from '@angular/core';
import { SalesChartData, DashboardRepository } from '../../domain/dashboard/dashboard.model';

@Injectable({ providedIn: 'root' })
export class GetSalesChartUseCase {
    constructor(private dashboardRepository: DashboardRepository) { }

    execute(period: 'daily' | 'weekly' | 'monthly'): Promise<SalesChartData> {
        return this.dashboardRepository.getSalesChart(period);
    }
}
