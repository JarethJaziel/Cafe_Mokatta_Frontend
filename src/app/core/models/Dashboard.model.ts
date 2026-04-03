export interface Stat {
    title: string;
    value: string;
    change: string;
}

export interface DashboardOrder {
    id: number;
    customer: string;
    total: number;
    status: string;
}

export interface TopProduct {
    id: number;
    name: string;
    sales: number;
}