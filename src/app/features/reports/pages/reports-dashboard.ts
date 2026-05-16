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
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-dashboard.html',
  styleUrl: './reports-dashboard.css',
})
export class ReportsDashboard implements OnInit {

  private readonly reportService = inject(ReportService);
  private readonly alertService = inject(AlertService);

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
      .subscribe({
        next: data => this.today = data,
        error: err => this.alertService.error('Error', err?.error?.message || 'Error loading dashboard data')
      });

    this.reportService.getSalesSeries(this.dateFrom, this.dateTo)
      .subscribe({
        next: data => this.salesSeries = data,
        error: err => this.alertService.error('Error', err?.error?.message || 'Error loading sales series')
      });

    this.reportService.getOrdersCountSeries(this.dateFrom, this.dateTo)
      .subscribe({
        next: data => this.ordersCounts = data,
        error: err => this.alertService.error('Error', err?.error?.message || 'Error loading order counts')
      });

    this.reportService.getTopProducts(this.dateFrom, this.dateTo, 10)
      .subscribe({
        next: data => this.topProducts = data,
        error: err => this.alertService.error('Error', err?.error?.message || 'Error loading top products')
      });

    this.reportService.getRevenueByCategory(this.dateFrom, this.dateTo)
      .subscribe({
        next: data => this.categoryRevenue = data,
        error: err => this.alertService.error('Error', err?.error?.message || 'Error loading category revenue')
      });

    this.reportService.getPaymentMethodSplit(this.dateFrom, this.dateTo)
      .subscribe({
        next: data => this.paymentSplit = data,
        error: err => this.alertService.error('Error', err?.error?.message || 'Error loading payment split')
      });

    const todayStr = new Date().toISOString().split('T')[0];
    this.reportService.getPeakHours(todayStr)
      .subscribe({
        next: data => this.peakHours = data,
        error: err => this.alertService.error('Error', err?.error?.message || 'Error loading peak hours')
      });
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

  private downloadFile(
    response: Blob,
    filename: string
  ) {

    const blob = new Blob([response]);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = filename;

    a.click();

    window.URL.revokeObjectURL(url);

  }

    downloadPdf() {

    this.reportService
      .downloadPdf(this.dateFrom, this.dateTo)
      .subscribe({

        next: (response:any) => {

          this.downloadFile(
            response,
            `reporte_${this.dateFrom}_${this.dateTo}.pdf`
          );

          this.alertService.success('PDF downloaded successfully');

        },

        error: (err) =>
          this.alertService.error(
            'Error',
            err?.error?.message || 'Error downloading PDF'
          )

      });

  }

  downloadExcel() {

    this.reportService
      .downloadExcel(this.dateFrom, this.dateTo)
      .subscribe({

        next: (response:any) => {

          this.downloadFile(
            response,
            `reporte_${this.dateFrom}_${this.dateTo}.xlsx`
          );

          this.alertService.success('Excel downloaded successfully');

        },

        error: (err) => {
          console.log(err);
          this.alertService.error(
            'Error',
            err?.error?.message || 'Error downloading Excel'
          )

      }});

  }

}
