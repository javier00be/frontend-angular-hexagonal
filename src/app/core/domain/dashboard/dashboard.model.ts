export interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    recentOrders: RecentOrder[];
    topProducts: TopProduct[];
    lowStockProducts: LowStockProduct[];
}

export interface RecentOrder {
    id: string;
    customerName: string;
    date: Date;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
}

export interface TopProduct {
    id: string;
    name: string;
    sales: number;
    revenue: number;
}

export interface LowStockProduct {
    id: string;
    name: string;
    stock: number;
    minStock: number;
}

export interface SalesChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string;
        borderColor?: string;
    }[];
}

export abstract class DashboardRepository {
    abstract getStats(): Promise<DashboardStats>;
    abstract getSalesChart(period: 'daily' | 'weekly' | 'monthly'): Promise<SalesChartData>;
}
