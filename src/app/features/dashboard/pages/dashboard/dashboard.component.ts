import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardOrder, Stat, TopProduct } from '../../../../core/models/Dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  stats?: Stat[];
  orders: DashboardOrder[] = [];
  topProducts: TopProduct[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dashboardService.getStats()
      .subscribe(data => this.stats = data);

    this.dashboardService.getRecentOrders()
      .subscribe(data => this.orders = data);

    this.dashboardService.getTopProducts()
      .subscribe(data => this.topProducts = data);
  }
}
