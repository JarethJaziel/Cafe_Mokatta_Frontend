import { Component, inject } from '@angular/core';
import { OrderItem, Order } from '../../../../core/models/Order.model';
import { Product } from '../../../../core/models/Product.model';
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

  products: Product[] = [];
  cart: OrderItem[] = [];

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  // ================= ADD =================
  addToCart(product: Product) {
    const item = this.cart.find(i => i.productId === product.id);

    if (item) {
      item.quantity++;
    } else {
      this.cart.push({
        productId: product.id!,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
  }

  // ================= TOTAL =================
  get subtotal() {
    return this.cart.reduce((acc, item) =>
      acc + (item.price * item.quantity), 0);
  }

  // ================= ORDER =================
  buildOrder(): Order {
    return {
      createdAt: new Date(),
      items: this.cart,
      total: this.subtotal,
      status: 'PENDING'
    };
  }

  processPayment() {
    const order = this.buildOrder();

    this.posService.createOrder(order)
      .subscribe(() => this.clearCart());
  }

  sendToKitchen() {
    const order = this.buildOrder();

    this.posService.sendToKitchen(order)
      .subscribe(() => this.clearCart());
  }

  clearCart() {
    this.cart = [];
  }
}
