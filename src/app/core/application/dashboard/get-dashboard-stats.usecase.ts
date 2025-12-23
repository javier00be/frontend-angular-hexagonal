import { Injectable } from '@angular/core';
import { DashboardStats, DashboardRepository } from '../../domain/dashboard/dashboard.model';

@Injectable({ providedIn: 'root' })
export class GetDashboardStatsUseCase {
    constructor(private dashboardRepository: DashboardRepository) { }

    execute(): Promise<DashboardStats> {
        return this.dashboardRepository.getStats();
    }
}
