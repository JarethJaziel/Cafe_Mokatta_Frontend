import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CreateCategoryRequest } from '../../../../core/models/Product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-manager',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './category-manager.html',
  styleUrl: './category-manager.css',
})
export class CategoryManagerComponent {

  private readonly productService = inject(ProductService);

  @Output() categoryCreated = new EventEmitter<void>();

  form: CreateCategoryRequest = {
    name: ''
  };

  loading = false;

  errorMessage = '';

  save() {

    this.errorMessage = '';

    if (!this.form.name.trim()) {

      this.errorMessage = 'Category name is required';

      return;

    }

    this.loading = true;

    this.productService.createCategory(this.form)
      .subscribe({

        next: () => {

          this.form = {
            name: ''
          };

          this.loading = false;

          this.categoryCreated.emit();

        },

        error: (err) => {

          this.loading = false;

          this.errorMessage =
            err?.error?.message ||
            'Error creating category';

        }

      });

  }


}
