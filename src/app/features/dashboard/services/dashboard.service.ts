import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stat, DashboardOrder, TopProduct, TodayDashboardDTO } from '../../../core/models/Dashboard.model';
import { MockDataService } from '../../../core/services/mock-data.service';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly api = inject(MokkatAPIService);
  private readonly mock = inject(MockDataService);
  private readonly useMock = false;


  getStats() {
    if (this.useMock) return of(this.mock.getStats());
    return this.api.get<TodayDashboardDTO>('reports/today').pipe(
      map(dto => [
        { title: 'Total Revenue', value: '$' + (dto.totalRevenue || 0), change: 'Today' },
        { title: 'Orders', value: (dto.ordersCount || 0).toString(), change: 'Today' },
        { title: 'Cash Sales', value: '$' + (dto.cashTotal || 0), change: 'Today' },
        { title: 'Card Sales', value: '$' + (dto.cardTotal || 0), change: 'Today' }
      ])
    );
  }

  getRecentOrders() {
    if (this.useMock) return of(this.mock.getDashboardsOrders());
    return this.api.get<any[]>('orders').pipe(
      map(orders => orders.slice(0, 5).map(o => ({
        id: o.id,
        customer: 'Walk-in Customer',
        total: o.totalAmount,
        status: o.paymentMethod
      })))
    );
  }

  getTopProducts() {
    if (this.useMock) return of(this.mock.getTopProducts() as any);
    return this.api.get<TopProduct[]>('reports/top-products?limit=5');
  }

}
