import { Component, inject, OnInit } from '@angular/core';
import { ProductResponse, CreateProductRequest, UpdateProductRequest, CategoryResponse } from '../../../../core/models/Product.model';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryManagerComponent } from '../../components/category-manager/category-manager.component';
@Component({
  selector: 'app-product-manager',
  imports: [FormsModule, CommonModule, CategoryManagerComponent],
  templateUrl: './product-manager.html',
  styleUrl: './product-manager.css',
})
export class ProductManager implements OnInit {

  private readonly productService = inject(ProductService);

  products: ProductResponse[] = [];
  categoriesList: CategoryResponse[] = [];

  form: CreateProductRequest & { imageUrl?: string } = this.emptyForm();

  editing = false;
  selectedId?: string;

  errorMessage = '';

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  emptyForm(): CreateProductRequest {
    return {
      name: '',
      description: '',
      price: 0,
      categoryId: '',
      imageUrl: ''
    };
  }

  // Previsualización de imagen
  imagePreview: string | ArrayBuffer | null = null;

  selectedFile?: File;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        // TODO: Implementar servicio de file upload y asignar URL devuelta
        // this.form.imageUrl = uploadedUrl;
      };
      reader.readAsDataURL(file);
    }
  }
// ================= LOAD =================

  loadProducts() {

    this.productService.getProducts()
      .subscribe({

        next: (data) => {

          this.products = data;

        },

        error: () => {

          this.errorMessage =
            'Error loading products';

        }

      });

  }

  loadCategories() {

    this.productService.getCategories()
      .subscribe({

        next: (data) => {

          this.categoriesList = data;

        },

        error: () => {

          this.errorMessage =
            'Error loading categories';

        }

      });

  }

  // ================= SAVE =================

  save() {

    this.errorMessage = '';

    const payload = {

      ...this.form,

      description: this.form.description || ''

    };

    const request = this.editing && this.selectedId

      ? this.productService.updateProduct(
          this.selectedId,
          payload as UpdateProductRequest
        )

      : this.productService.createProduct(payload);

    request.subscribe({

      next: () => {

        this.resetForm();

        this.loadProducts();

      },

      error: (err) => {

        this.errorMessage =

          err?.error?.message ||

          'Error saving product';

      }

    });

  }

  // ================= EDIT =================

  edit(product: ProductResponse) {

    this.form = {

      name: product.name,

      description: product.description || '',

      price: product.price,

      categoryId: product.categoryId,

      imageUrl: product.imageUrl || undefined

    };

    this.editing = true;

    this.selectedId = product.id;

    this.imagePreview = product.imageUrl || null;

  }

  // ================= TOGGLE =================

  toggleAvailable(id: string) {

    this.productService.toggleAvailable(id)
      .subscribe({

        next: () => {

          this.loadProducts();

        },

        error: () => {

          this.errorMessage =
            'Error updating product availability';

        }

      });

  }

  toggleActive(id: string) {

    this.productService.toggleActive(id)
      .subscribe({

        next: () => {

          this.loadProducts();

        },

        error: () => {

          this.errorMessage =
            'Error updating product status';

        }

      });

  }

  // ================= RESET =================

  resetForm() {

    this.form = this.emptyForm();

    this.editing = false;

    this.selectedId = undefined;

    this.imagePreview = null;

    this.errorMessage = '';

  }

  // ================= CATEGORY STATS =================

  get categories() {

    const total = this.products.length;

    if (total === 0) return [];

    const counts = this.products.reduce((acc: any, p) => {

      const catName = p.categoryName || 'Uncategorized';

      acc[catName] = (acc[catName] || 0) + 1;

      return acc;

    }, {});

    return Object.keys(counts).map(key => ({

      name: key,

      count: counts[key],

      percentage: (counts[key] / total) * 100

    }));
  }

}
