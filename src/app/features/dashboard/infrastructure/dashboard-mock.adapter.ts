import { Injectable } from '@angular/core';
import {
    DashboardRepository,
    DashboardStats,
    SalesChartData,
    RecentOrder,
    TopProduct,
    LowStockProduct
} from '../../../core/domain/dashboard/dashboard.model';

@Injectable()
export class DashboardMockAdapter extends DashboardRepository {

    /**
     * Obtiene estadísticas del dashboard con datos mock
     * Simula un delay de red para testing
     */
    async getStats(): Promise<DashboardStats> {
        // Simular delay de API
        await this.delay(500);

        const recentOrders: RecentOrder[] = [
            {
                id: 'ORD-001',
                customerName: 'Juan Pérez',
                date: new Date('2024-12-10'),
                total: 1250.50,
                status: 'completed'
            },
            {
                id: 'ORD-002',
                customerName: 'María García',
                date: new Date('2024-12-11'),
                total: 890.00,
                status: 'pending'
            },
            {
                id: 'ORD-003',
                customerName: 'Carlos López',
                date: new Date('2024-12-11'),
                total: 2100.75,
                status: 'completed'
            },
            {
                id: 'ORD-004',
                customerName: 'Ana Martínez',
                date: new Date('2024-12-12'),
                total: 450.00,
                status: 'pending'
            },
            {
                id: 'ORD-005',
                customerName: 'Luis Rodríguez',
                date: new Date('2024-12-12'),
                total: 1680.25,
                status: 'completed'
            }
        ];

        const topProducts: TopProduct[] = [
            { id: '1', name: 'Laptop HP', sales: 45, revenue: 45000 },
            { id: '2', name: 'Mouse Logitech', sales: 120, revenue: 3600 },
            { id: '3', name: 'Teclado Mecánico', sales: 80, revenue: 8000 },
            { id: '4', name: 'Monitor Samsung', sales: 35, revenue: 10500 },
            { id: '5', name: 'Webcam HD', sales: 60, revenue: 4200 }
        ];

        const lowStockProducts: LowStockProduct[] = [
            { id: '1', name: 'Laptop HP', stock: 5, minStock: 10 },
            { id: '2', name: 'Mouse Logitech', stock: 8, minStock: 20 },
            { id: '3', name: 'Auriculares Sony', stock: 3, minStock: 15 }
        ];

        return {
            totalSales: 125430.50,
            totalOrders: 342,
            totalProducts: 156,
            totalCustomers: 89,
            recentOrders,
            topProducts,
            lowStockProducts
        };
    }

    /**
     * Obtiene datos del gráfico de ventas según el período
     */
    async getSalesChart(period: 'daily' | 'weekly' | 'monthly'): Promise<SalesChartData> {
        await this.delay(300);

        switch (period) {
            case 'daily':
                return {
                    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                    datasets: [{
                        label: 'Ventas Diarias',
                        data: [12000, 19000, 15000, 22000, 18000, 25000, 20000],
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgb(59, 130, 246)'
                    }]
                };

            case 'weekly':
                return {
                    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                    datasets: [{
                        label: 'Ventas Semanales',
                        data: [85000, 92000, 78000, 105000],
                        backgroundColor: 'rgba(16, 185, 129, 0.5)',
                        borderColor: 'rgb(16, 185, 129)'
                    }]
                };

            case 'monthly':
                return {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    datasets: [{
                        label: 'Ventas Mensuales',
                        data: [320000, 280000, 350000, 390000, 420000, 380000, 450000, 410000, 480000, 520000, 490000, 550000],
                        backgroundColor: 'rgba(139, 92, 246, 0.5)',
                        borderColor: 'rgb(139, 92, 246)'
                    }]
                };
        }
    }

    /**
     * Simula delay de red
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
