import { SalesChartData, DashboardRepository } from '../../domain/dashboard/dashboard.model';

export class GetSalesChartUseCase {
    constructor(private dashboardRepository: DashboardRepository) { }

    execute(period: 'daily' | 'weekly' | 'monthly'): Promise<SalesChartData> {
        return this.dashboardRepository.getSalesChart(period);
    }
}
