import { Component, inject } from '@angular/core';
import { IngredientResponse, CreateIngredientRequest, UpdateIngredientRequest, AdjustStockRequest } from '../../../../core/models/Inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-list.html',
  styleUrl: './inventory-list.css',
})
export class InventoryList {
  private readonly service = inject(InventoryService);

  items: IngredientResponse[] = [];

  form: CreateIngredientRequest = {
    name: '',
    unit: '',
    quantity: 0,
    minStock: 0
  };

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getItems()
      .subscribe(data => this.items = data);
  }

  search = '';

  editing = false;
  selectedId?: string;

  // ================= ADJUST STOCK =================
  adjustStock(id: string, type: 'ADD' | 'SUBTRACT') {
    const amountStr = prompt(`Enter amount to ${type.toLowerCase()}:`);
    if (!amountStr) return;
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return;

    const request: AdjustStockRequest = { amount, type };
    this.service.adjustStock(id, request)
      .subscribe(() => this.load());
  }

  // ================= EDIT =================
  edit(item: IngredientResponse) {
    this.form = {
      name: item.name,
      unit: item.unit,
      quantity: item.quantity,
      minStock: item.minStock
    };
    this.editing = true;
    this.selectedId = item.id;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ================= SAVE =================
  save() {
    if (!this.form.name || !this.form.unit) return;

    if (this.editing && this.selectedId) {
      const updatePayload: UpdateIngredientRequest = {
        name: this.form.name,
        unit: this.form.unit,
        minStock: this.form.minStock
      };
      this.service.update(this.selectedId, updatePayload)
        .subscribe(() => {
          this.resetForm();
          this.load();
        });
    } else {
      this.service.create(this.form)
        .subscribe(() => {
          this.resetForm();
          this.load();
        });
    }
  }

  // ================= RESET =================
  resetForm() {
    this.form = {
      name: '',
      unit: '',
      quantity: 0,
      minStock: 0
    };
    this.editing = false;
    this.selectedId = undefined;
  }

  // ================= TOGGLE ACTIVE =================
  toggleActive(id: string) {
    this.service.toggleActive(id)
      .subscribe(() => this.load());
  }

}
