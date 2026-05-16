import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardOrder, Stat, TopProductDTO } from '../../../../core/models/Dashboard.model';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LowerCasePipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly alertService = inject(AlertService);

  stats?: Stat[];
  orders: DashboardOrder[] = [];
  topProducts: TopProductDTO[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dashboardService.getStats()
      .subscribe({
        next: data => this.stats = data,
        error: err => this.alertService.error('Error al cargar métricas', err?.error?.message)
      });

    this.dashboardService.getRecentOrders()
      .subscribe({
        next: data => this.orders = data,
        error: err => this.alertService.error('Error al cargar órdenes', err?.error?.message)
      });

    this.dashboardService.getTopProducts()
      .subscribe({
        next: data => this.topProducts = data,
        error: err => this.alertService.error('Error al cargar productos más vendidos', err?.error?.message)
      });
  }
}
