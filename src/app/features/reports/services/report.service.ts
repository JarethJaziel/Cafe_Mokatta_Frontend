import { inject, Injectable } from '@angular/core';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';
import {
  TodayDashboardDTO,
  SalesSeriesDTO,
  CountSeriesDTO,
  TopProductDTO,
  CategoryRevenueDTO,
  PaymentMethodSplitDTO,
  PeakHourDTO
} from '../../../core/models/Dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  private readonly api = inject(MokkatAPIService);

  getTodayDashboard() {
    return this.api.get<TodayDashboardDTO>('reports/today');
  }

  getSalesSeries(from: string, to: string) {
    return this.api.get<SalesSeriesDTO[]>('reports/sales', { from, to });
  }

  getOrdersCountSeries(from: string, to: string) {
    return this.api.get<CountSeriesDTO[]>('reports/orders-count', { from, to });
  }

  getTopProducts(from: string, to: string, limit = 10) {
    return this.api.get<TopProductDTO[]>('reports/top-products', { from, to, limit: limit.toString() });
  }

  getRevenueByCategory(from: string, to: string) {
    return this.api.get<CategoryRevenueDTO[]>('reports/revenue-by-category', { from, to });
  }

  getPaymentMethodSplit(from: string, to: string) {
    return this.api.get<PaymentMethodSplitDTO[]>('reports/payment-methods', { from, to });
  }

  getPeakHours(date: string) {
    return this.api.get<PeakHourDTO[]>('reports/peak-hours', { date });
  }

  downloadPdf(from: string, to: string) {

    return this.api.download(
      'reports/download/pdf',
      { from, to },
      {
        responseType: 'blob'
      }
    );

  }

  downloadExcel(from: string, to: string) {

    return this.api.download(
      'reports/download/excel',
      { from, to },
      {
        responseType: 'blob'
      }
    );

  }

}
