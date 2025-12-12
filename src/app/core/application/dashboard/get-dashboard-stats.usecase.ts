import { DashboardStats, DashboardRepository } from '../../domain/dashboard/dashboard.model';

export class GetDashboardStatsUseCase {
    constructor(private dashboardRepository: DashboardRepository) { }

    execute(): Promise<DashboardStats> {
        return this.dashboardRepository.getStats();
    }
}
