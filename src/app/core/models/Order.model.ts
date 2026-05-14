// ===================== ORDER RESPONSE =====================

export interface OrderResponse {
  id: string;
  userId: string;
  userEmail: string;
  paymentMethod: string;
  subtotal: number;
  total: number;
  notes: string;
  createdAt: string; // ISO 8601
  items: OrderItemResponse[];
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

// ===================== REQUESTS =====================

export interface CreateOrderRequest {
  paymentMethod: 'CASH' | 'CARD';
  notes?: string;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

// ===================== CART (local, para UI del POS) =====================

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}