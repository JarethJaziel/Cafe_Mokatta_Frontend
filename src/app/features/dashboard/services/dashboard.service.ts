import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Stat, TodayDashboardDTO, TopProductDTO } from '../../../core/models/Dashboard.model';
import { OrderResponse } from '../../../core/models/Order.model';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly api = inject(MokkatAPIService);

  getStats() {
    return this.api.get<TodayDashboardDTO>('reports/today').pipe(
      map(dto => [
        { title: 'Total Sales', value: '$' + (dto.totalSales || 0), change: 'Today' },
        { title: 'Orders', value: (dto.ordersCount || 0).toString(), change: 'Today' },
        { title: 'Avg. Order', value: '$' + (dto.avgOrderValue || 0), change: 'Today' }
      ] as Stat[])
    );
  }

  getRecentOrders() {
    return this.api.get<OrderResponse[]>('orders').pipe(
      map(orders => orders.slice(0, 5).map(o => ({
        id: o.id,
        customer: o.userEmail || 'Walk-in',
        total: o.total,
        status: o.paymentMethod
      })))
    );
  }

  getTopProducts() {
    // Usamos un rango de hoy para los top products
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    return this.api.get<TopProductDTO[]>('reports/top-products', {
      from: startOfDay.toISOString(),
      to: endOfDay.toISOString(),
      limit: '5'
    });
  }

}
