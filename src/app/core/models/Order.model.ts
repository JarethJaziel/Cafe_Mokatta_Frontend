export interface OrderItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id?: number;
    items: OrderItem[];
    total: number;
    status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED';
    createdAt: Date;
}