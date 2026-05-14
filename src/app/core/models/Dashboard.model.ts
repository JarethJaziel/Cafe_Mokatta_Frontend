// ===================== STAT (UI helper) =====================

export interface Stat {
  title: string;
  value: string;
  change: string;
}

// ===================== TODAY DASHBOARD =====================

export interface TodayDashboardDTO {
  totalSales: number;
  ordersCount: number;
  avgOrderValue: number;
}

// ===================== DASHBOARD ORDER (UI helper) =====================

export interface DashboardOrder {
  id: string;
  customer: string;
  total: number;
  status: string;
}

// ===================== TOP PRODUCT =====================

export interface TopProductDTO {
  productName: string;
  quantitySold: number;
  totalRevenue: number;
}

// ===================== REPORT SERIES =====================

export interface SalesSeriesDTO {
  date: string;
  amount: number;
}

export interface CountSeriesDTO {
  date: string;
  count: number;
}

export interface CategoryRevenueDTO {
  categoryName: string;
  revenue: number;
}

export interface PaymentMethodSplitDTO {
  paymentMethod: string;
  amount: number;
  count: number;
}

export interface PeakHourDTO {
  hour: number;
  ordersCount: number;
}