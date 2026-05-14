import { inject, Injectable } from '@angular/core';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';
import {
  IngredientResponse,
  CreateIngredientRequest,
  UpdateIngredientRequest,
  AdjustStockRequest
} from '../../../core/models/Inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private readonly api = inject(MokkatAPIService);

  getItems() {
    return this.api.get<IngredientResponse[]>('inventory');
  }

  getLowStock() {
    return this.api.get<IngredientResponse[]>('inventory/low-stock');
  }

  getById(id: string) {
    return this.api.get<IngredientResponse>(`inventory/${id}`);
  }

  create(item: CreateIngredientRequest) {
    return this.api.post<IngredientResponse>('inventory', item);
  }

  update(id: string, item: UpdateIngredientRequest) {
    return this.api.patch<IngredientResponse>(`inventory/${id}`, item);
  }

  adjustStock(id: string, request: AdjustStockRequest) {
    return this.api.patch<IngredientResponse>(`inventory/${id}/adjust`, request);
  }

  toggleActive(id: string) {
    return this.api.patchNoBody<void>(`inventory/${id}/toggle-active`);
  }

}
