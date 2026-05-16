import { inject, Injectable } from '@angular/core';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';
import { ProductResponse, CreateProductRequest, UpdateProductRequest, CreateCategoryRequest } from '../../../core/models/Product.model';
import { CategoryResponse } from '../../../core/models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly api = inject(MokkatAPIService);

  getProducts() {
    return this.api.get<ProductResponse[]>('products');
  }

  createCategory(category: CreateCategoryRequest) {
    return this.api.post<CategoryResponse>('categories', category);
  }

  getCategories() {
    return this.api.get<CategoryResponse[]>('categories');
  }

  getProduct(id: string) {
    return this.api.get<ProductResponse>(`products/${id}`);
  }

  createProduct(product: CreateProductRequest) {
    return this.api.post<ProductResponse>('products', product);
  }

  updateProduct(id: string, product: UpdateProductRequest) {
    return this.api.patch<ProductResponse>(`products/${id}`, product);
  }

  toggleAvailable(id: string) {
    return this.api.patchNoBody<void>(`products/${id}/toggle-available`);
  }

  toggleActive(id: string) {
    return this.api.patchNoBody<void>(`products/${id}/toggle-active`);
  }

  getTicket(id: string){
    return this.api.get<void>(`tickets/${id}/pdf`);
  }

}
