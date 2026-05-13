import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../../../core/models/Product.model';
import { MockDataService } from '../../../core/services/mock-data.service';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly mock = inject(MockDataService);
  private readonly api = inject(MokkatAPIService);

  private readonly useMock = false; //Cambiar cuando haya backend uwu

  getProducts() {
    if (this.useMock) {
      return of(this.mock.getProducts());
    }
    return this.api.get<Product[]>('products');
  }

  getCategories() {
    if (this.useMock) {
      return of([]); // Mock si es necesario
    }
    return this.api.get<any[]>('categories');
  }

  getProduct(id: number) {
    if (this.useMock) {
      return of(this.mock.getProductById(id));
    }
    return this.api.get<Product>(`products/${id}`);
  }

  createProduct(product: Product) {
    if (this.useMock) {
      console.log('MOCK CREATE', product);
      return of(product);
    }
    return this.api.post<Product>('products', product);
  }

  updateProduct(id: number, product: Product) {
    if (this.useMock) {
      console.log('MOCK UPDATE', product);
      return of(product);
    }
    return this.api.patch<Product>(`products/${id}`, product);
  }

  deleteProduct(id: number) {
    if (this.useMock) {
      console.log('MOCK DELETE', id);
      return of(true);
    }
    return this.api.delete(`products/${id}`);
  }

}
