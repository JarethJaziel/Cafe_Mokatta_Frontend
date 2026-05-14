import { Component, inject } from '@angular/core';
import { CartItem, CreateOrderRequest, OrderItemRequest } from '../../../../core/models/Order.model';
import { ProductResponse } from '../../../../core/models/Product.model';
import { ProductService } from '../../../products/services/product.service';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-order-pos',
  imports: [],
  templateUrl: './order-pos.html',
  styleUrl: './order-pos.css',
})
export class OrderPos {
  private productService = inject(ProductService);
  private posService = inject(PosService);

  products: ProductResponse[] = [];
  cart: CartItem[] = [];

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  // ================= ADD =================
  addToCart(product: any) {
    const id = product.id || product.productId;
    const item = this.cart.find(i => i.productId === id);

    if (item) {
      item.quantity++;
    } else {
      this.cart.push({
        productId: product.id || product.productId,
        name: product.name || product.productName,
        price: product.price || product.unitPrice,
        quantity: 1
      });
    }
  }

  decreaseQty(product: any) {
    const id = product.id || product.productId;
    const item = this.cart.find(i => i.productId === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity === 0) {
      this.cart = this.cart.filter(i => i.productId !== id);
    }
  }

  getQty(productId: string): number {
    const item = this.cart.find(i => i.productId === productId);
    return item ? item.quantity : 0;
  }

  // ================= TOTAL =================
  get subtotal() {
    return this.cart.reduce((acc, item) =>
      acc + (item.price * item.quantity), 0);
  }

  // ================= ORDER =================
  processPayment(method: 'CASH' | 'CARD') {
    const request: CreateOrderRequest = {
      paymentMethod: method,
      items: this.cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      } as OrderItemRequest))
    };

    this.posService.createOrder(request)
      .subscribe(() => this.clearCart());
  }

  clearCart() {
    this.cart = [];
  }
}
