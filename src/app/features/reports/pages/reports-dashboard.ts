import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../services/report.service';
import {
  TodayDashboardDTO,
  SalesSeriesDTO,
  TopProductDTO,
  CategoryRevenueDTO,
  PaymentMethodSplitDTO,
  PeakHourDTO,
  CountSeriesDTO
} from '../../../core/models/Dashboard.model';

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-dashboard.html',
  styleUrl: './reports-dashboard.css',
})
export class ReportsDashboard implements OnInit {

  private readonly reportService = inject(ReportService);

  // Data
  today?: TodayDashboardDTO;
  salesSeries: SalesSeriesDTO[] = [];
  ordersCounts: CountSeriesDTO[] = [];
  topProducts: TopProductDTO[] = [];
  categoryRevenue: CategoryRevenueDTO[] = [];
  paymentSplit: PaymentMethodSplitDTO[] = [];
  peakHours: PeakHourDTO[] = [];

  // Date range
  dateFrom = '';
  dateTo = '';

  ngOnInit() {
    // Default: last 7 days
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    this.dateTo = this.toDateTimeISO(now);
    this.dateFrom = this.toDateTimeISO(weekAgo);

    this.loadAll();
  }

  loadAll() {
    this.reportService.getTodayDashboard()
      .subscribe(data => this.today = data);

    this.reportService.getSalesSeries(this.dateFrom, this.dateTo)
      .subscribe(data => this.salesSeries = data);

    this.reportService.getOrdersCountSeries(this.dateFrom, this.dateTo)
      .subscribe(data => this.ordersCounts = data);

    this.reportService.getTopProducts(this.dateFrom, this.dateTo, 10)
      .subscribe(data => this.topProducts = data);

    this.reportService.getRevenueByCategory(this.dateFrom, this.dateTo)
      .subscribe(data => this.categoryRevenue = data);

    this.reportService.getPaymentMethodSplit(this.dateFrom, this.dateTo)
      .subscribe(data => this.paymentSplit = data);

    const todayStr = new Date().toISOString().split('T')[0];
    this.reportService.getPeakHours(todayStr)
      .subscribe(data => this.peakHours = data);
  }

  onDateChange() {
    if (this.dateFrom && this.dateTo) {
      this.loadAll();
    }
  }

  // Helpers
  private toDateTimeISO(d: Date): string {
    return d.toISOString();
  }

  getMaxSales(): number {
    return Math.max(...this.salesSeries.map(s => s.amount), 1);
  }

  getMaxOrders(): number {
    return Math.max(...this.ordersCounts.map(s => s.count), 1);
  }

  getMaxRevenue(): number {
    return Math.max(...this.categoryRevenue.map(s => s.revenue), 1);
  }

  getMaxPeakHours(): number {
    return Math.max(...this.peakHours.map(s => s.ordersCount), 1);
  }

  getTotalPayments(): number {
    return this.paymentSplit.reduce((sum, p) => sum + p.count, 0) || 1;
  }

  formatHour(hour: number): string {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    return `${h}:00 ${ampm}`;
  }

}
