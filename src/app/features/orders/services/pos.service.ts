import { Injectable, inject } from '@angular/core';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';
import { CreateOrderRequest, OrderResponse } from '../../../core/models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  private readonly api = inject(MokkatAPIService);

  createOrder(order: CreateOrderRequest) {
    return this.api.post<OrderResponse>('orders', order);
  }

  getOrders() {
    return this.api.get<OrderResponse[]>('orders');
  }

  getOrderById(id: string) {
    return this.api.get<OrderResponse>(`orders/${id}`);
  }

  getTicket(id: string) {
    return this.api.get<void>(`tickets/${id}/pdf`);
  }

}