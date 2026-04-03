import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Stat, DashboardOrder, TopProduct } from '../../../core/models/Dashboard.model';
import { MockDataService } from '../../../core/services/mock-data.service';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly api = inject(MokkatAPIService);
  private readonly mock = inject(MockDataService);
  private readonly useMock = true;


  getStats() {
    if (this.useMock) return of(this.mock.getStats());
    return this.api.get<Stat[]>('dashboard/stats');
  }

  getRecentOrders() {
    if (this.useMock) return of(this.mock.getDashboardsOrders());
    return this.api.get<DashboardOrder[]>('dashboard/orders');
  }

  getTopProducts() {
    if (this.useMock) return of(this.mock.getTopProducts());
    return this.api.get<TopProduct[]>('dashboard/top-products');
  }

}
