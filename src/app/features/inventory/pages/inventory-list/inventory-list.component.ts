import { Component, OnInit, inject } from '@angular/core';
import { InventoryItem } from '../../../../core/models/Inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-list',
  standalone: true, // 🔥 IMPORTANTE
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.css'], // 👈 también corregido
})
export class InventoryList implements OnInit {

  private service = inject(InventoryService);

  items: InventoryItem[] = [];

  search = '';

  editing = false;
  selectedId?: number;

  form: InventoryItem = this.emptyForm();

  // ================= INIT =================
  ngOnInit() {
    this.load();
  }

  // ================= LOAD =================
  load() {
    this.service.getItems()
      .subscribe(data => this.items = data);
  }

  // ================= FORM =================
  emptyForm(): InventoryItem {
    return {
      name: '',
      unit: '',
      stock: 0,
      minStock: 0
    };
  }

  // ================= EDIT =================
  edit(item: InventoryItem) {
    this.form = { ...item };
    this.editing = true;
    this.selectedId = item.id;
  }

  // ================= SAVE =================
  save() {

    if (!this.form.name || !this.form.unit) return; // 🔥 validación básica

    if (this.editing && this.selectedId) {

      this.service.update(this.selectedId, this.form)
        .subscribe(() => {
          this.afterSave();
        });

    } else {

      this.service.create(this.form)
        .subscribe(() => {
          this.afterSave();
        });

    }
  }

  // ================= DELETE =================
  delete(id: number) {
    this.service.delete(id)
      .subscribe(() => this.load());
  }

  // ================= HELPERS =================
  afterSave() {
    this.resetForm();
    this.load();
  }

  resetForm() {
    this.form = this.emptyForm();
    this.editing = false;
    this.selectedId = undefined;
  }

}