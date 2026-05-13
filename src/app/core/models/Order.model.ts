export interface OrderItem {
    productId: number;
    name: string;
    price: number; // Unit price at the time of sale
    quantity: number;
}

export interface Order {
    id?: number;
    items: OrderItem[];
    totalAmount: number;
    paymentMethod: 'CASH' | 'CARD';
    orderDate: Date;
}