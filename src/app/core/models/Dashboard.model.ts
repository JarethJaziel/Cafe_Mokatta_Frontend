export interface Stat {
    title: string;
    value: string;
    change: string;
}

export interface TodayDashboardDTO {
    totalRevenue: number;
    ordersCount: number;
    cashTotal: number;
    cardTotal: number;
}

export interface DashboardOrder {
    id: number;
    customer: string;
    total: number;
    status: string;
}

export interface TopProduct {
    productId: number;
    productName: string;
    quantitySold: number;
}