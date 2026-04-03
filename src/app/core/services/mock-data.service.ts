import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { DashboardOrder, Stat, TopProduct } from '../models/Dashboard.model';
import { InventoryItem } from '../models/Inventory.model';
import { Order } from '../models/Order.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {

  // ================= PRODUCTS =================
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Café Americano',
      category: 'Café',
      price: 35,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaK_3CPUX1YgGZtv-SPWe_h-OfNijw2a3oUw&s',
      stock: 20
    },
    {
      id: 2,
      name: 'Frappé Mocha',
      category: 'Frappé',
      price: 65,
      image: 'https://cdn7.kiwilimon.com/recetaimagen/20073/640x640/12137.jpg.jpg',
      stock: 15
    },
    {
      id: 3,
      name: 'Café Moka',
      category: 'Café',
      price: 45,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5NwWjCvYhEmP8WQE94rmbBZPDFtCqe0pIBA&s',
      stock: 15
    },
    {
      id: 4,
      name: 'CheeseCake',
      category: 'Postre',
      price: 50,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpS6yaJcvttjlTPYohqV_7Kgc-WjBUwY8iYw&s',
      stock: 15
    },
  ];

  // ================= DASHBOARD =================
  private readonly stats: Stat[] = [
    { title: 'Ventas hoy', value: '$1,250', change: '+12%' },
    { title: 'Pedidos', value: '32', change: '+5%' },
    { title: 'Productos', value: '120', change: '+2%' },
    { title: 'Clientes', value: '89', change: '+8%' }
  ];

  private readonly dashboardOrders: DashboardOrder[] = [
    { id: 1, customer: 'Juan', total: 120, status: 'Preparando' },
    { id: 2, customer: 'Ana', total: 80, status: 'Entregado' },
    { id: 3, customer: 'Luis', total: 150, status: 'Pendiente' }
  ];

  private readonly topProducts: TopProduct[] = [
    { id: 1, name: 'Café Americano', sales: 120 },
    { id: 2, name: 'Frappé', sales: 90 },
    { id: 3, name: 'Capuccino', sales: 70 }
  ];

  // ================= INVENTORY =================
  private inventory: InventoryItem[] = [
    { id: 1, name: 'Leche', unit: 'ml', stock: 2000, minStock: 500 },
    { id: 2, name: 'Café Molido', unit: 'g', stock: 1000, minStock: 300 },
    { id: 3, name: 'Azúcar', unit: 'g', stock: 800, minStock: 200 }
  ];

  // ================= ORDERS =================
  private orders: Order[] = [];

  // ================= PRODUCTS =================

  getProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // ================= DASHBOARD =================

  getStats(): Stat[] {
    return [...this.stats];
  }

  getDashboardsOrders(): DashboardOrder[] {
    return [...this.dashboardOrders];
  }

  getTopProducts(): TopProduct[] {
    return [...this.topProducts];
  }

  // ================= INVENTORY =================

  getInventory() {
    return [...this.inventory];
  }

  addInventory(item: InventoryItem) {
    item.id = Date.now();
    this.inventory.push(item);
    return item;
  }

  updateInventory(id: number, item: InventoryItem) {
    const index = this.inventory.findIndex(i => i.id === id);
    if (index !== -1) {
      this.inventory[index] = { ...this.inventory[index], ...item };
      return this.inventory[index];
    }
    return null;
  }

  deleteInventory(id: number) {
    this.inventory = this.inventory.filter(i => i.id !== id);
    return true;
  }

  // ================= ORDERS =================

  createOrder(order: Order) {
    order.id = Date.now();
    order.createdAt = new Date();
    this.orders.push(order);
    return order;
  }

  getOrders() {
    return [...this.orders];
  }


}