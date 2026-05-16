import { Component, inject } from '@angular/core';
import { IngredientResponse, CreateIngredientRequest, UpdateIngredientRequest, AdjustStockRequest } from '../../../../core/models/Inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule, FormsModule, NgxPaginationModule, SearchPipe],
  templateUrl: './inventory-list.html',
  styleUrl: './inventory-list.css',
})
export class InventoryList {
  private readonly service = inject(InventoryService);
  private readonly alertService = inject(AlertService);

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
      .subscribe({
        next: data => this.items = data,
        error: err => this.alertService.error('Error al cargar inventario', err?.error?.message || 'Error desconocido')
      });
  }

  search = '';
  page = 1;
  pageSize = 10;

  editing = false;
  selectedId?: string;

  adjustStock(id: string, type: 'ADD' | 'SUBTRACT') {
    const amountStr = prompt(`Enter amount to ${type.toLowerCase()}:`);
    if (!amountStr) return;
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return;

    const request: AdjustStockRequest = { amount, type };
    this.service.adjustStock(id, request)
      .subscribe({
        next: () => {
          this.alertService.success('Stock actualizado');
          this.load();
        },
        error: err => this.alertService.error('Error al ajustar stock', err?.error?.message)
      });
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

  save() {
    if (!this.form.name || !this.form.unit) {
      this.alertService.warning('Campos requeridos', 'Por favor completa el nombre y la unidad.');
      return;
    }

    if (this.editing && this.selectedId) {
      const updatePayload: UpdateIngredientRequest = {
        name: this.form.name,
        unit: this.form.unit,
        minStock: this.form.minStock
      };
      this.service.update(this.selectedId, updatePayload)
        .subscribe({
          next: () => {
            this.alertService.success('Ingrediente actualizado');
            this.resetForm();
            this.load();
          },
          error: err => this.alertService.error('Error al actualizar', err?.error?.message)
        });
    } else {
      this.service.create(this.form)
        .subscribe({
          next: () => {
            this.alertService.success('Ingrediente creado');
            this.resetForm();
            this.load();
          },
          error: err => this.alertService.error('Error al crear', err?.error?.message)
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

  toggleActive(id: string) {
    this.service.toggleActive(id)
      .subscribe({
        next: () => {
          this.alertService.success('Estado actualizado');
          this.load();
        },
        error: err => this.alertService.error('Error', err?.error?.message)
      });
  }

}
