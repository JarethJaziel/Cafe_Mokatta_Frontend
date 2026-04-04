import { Component, inject } from '@angular/core';
import { InventoryItem } from '../../../../core/models/Inventory.model';
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

  items: InventoryItem[] = [];

  form: InventoryItem = {
    name: '',
    unit: '',
    stock: 0,
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
  selectedId?: number;

  edit(item: any) {
    this.form = { ...item };
    this.editing = true;
    this.selectedId = item.id;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  save() {

    if (!this.form.name || !this.form.unit) return;

    if (this.editing && this.selectedId) {
      this.service.update(this.selectedId, this.form)
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

  resetForm() {
    this.form = {
      name: '',
      unit: '',
      stock: 0,
      minStock: 0
    };
    this.editing = false;
    this.selectedId = undefined;
  }

  delete(id: number) {
    this.service.delete(id)
      .subscribe(() => this.load());
  }


}
