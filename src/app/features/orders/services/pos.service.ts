import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { Order } from '../../../core/models/Order.model';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';
import { MockDataService } from '../../../core/services/mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  private readonly api = inject(MokkatAPIService);
  private readonly mock = inject(MockDataService);
  private readonly useMock = true;



  createOrder(order: Order) {
    if (this.useMock) return of(this.mock.createOrder(order));
    return this.api.post('orders', order);
  }

  sendToKitchen(order: Order) {
    if (this.useMock) {
      order.status = 'PREPARING';
      return of(this.mock.createOrder(order));
    }
    return this.api.post('orders/kitchen', order);
  }
}