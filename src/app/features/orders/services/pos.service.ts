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
  private readonly useMock = false;



  createOrder(order: Order) {
    if (this.useMock) {
      return of(this.mock.createOrder(order));
    }
    
    // El backend espera { paymentMethod, items: [{ productId, quantity }] }
    const payload = {
      paymentMethod: order.paymentMethod,
      items: order.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
    
    return this.api.post('orders', payload);
  }
}