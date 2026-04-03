import { inject, Injectable } from '@angular/core';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';
import { MockDataService } from '../../../core/services/mock-data.service';
import { of } from 'rxjs';
import { InventoryItem } from '../../../core/models/Inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private readonly api = inject(MokkatAPIService);
  private readonly mock = inject(MockDataService);
  private readonly useMock = true;


  getItems() {
    if (this.useMock) return of(this.mock.getInventory());
    return this.api.get<InventoryItem[]>('inventory');
  }

  create(item: InventoryItem) {
    if (this.useMock) return of(this.mock.addInventory(item));
    return this.api.post<InventoryItem>('inventory', item);
  }

  delete(id: number) {
    if (this.useMock) return of(this.mock.deleteInventory(id));
    return this.api.delete(`inventory/${id}`);
  }

  update(id: number, item: InventoryItem) {
    if (this.useMock) return of(this.mock.updateInventory(id, item));
    return this.api.put<InventoryItem>(`inventory/${id}`, item);
  }

}
