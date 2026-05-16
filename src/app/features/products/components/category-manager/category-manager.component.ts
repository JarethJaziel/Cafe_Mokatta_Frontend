import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CreateCategoryRequest } from '../../../../core/models/Product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-category-manager',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './category-manager.html',
  styleUrl: './category-manager.css',
})
export class CategoryManagerComponent {

  private readonly productService = inject(ProductService);
  private readonly alertService = inject(AlertService);

  @Output() categoryCreated = new EventEmitter<void>();

  form: CreateCategoryRequest = {
    name: ''
  };

  loading = false;

  save() {
    if (!this.form.name.trim()) {
      this.alertService.warning('Campo requerido', 'El nombre de la categoría es obligatorio.');
      return;
    }

    this.loading = true;

    this.productService.createCategory(this.form)
      .subscribe({
        next: () => {
          this.form = { name: '' };
          this.loading = false;
          this.alertService.success('Categoría creada');
          this.categoryCreated.emit();
        },
        error: (err) => {
          this.loading = false;
          this.alertService.error('Error al crear categoría', err?.error?.message);
        }
      });

  }


}
