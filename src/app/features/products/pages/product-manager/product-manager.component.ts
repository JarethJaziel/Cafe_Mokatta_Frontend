import { Component, inject, OnInit } from '@angular/core';
import { ProductResponse, CreateProductRequest, UpdateProductRequest, CategoryResponse } from '../../../../core/models/Product.model';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryManagerComponent } from '../../components/category-manager/category-manager.component';
import { AlertService } from '../../../../core/services/alert.service';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
@Component({
  selector: 'app-product-manager',
  imports: [FormsModule, CommonModule, CategoryManagerComponent, SearchPipe],
  templateUrl: './product-manager.html',
  styleUrl: './product-manager.css',
})
export class ProductManager implements OnInit {

  private readonly productService = inject(ProductService);
  private readonly alertService = inject(AlertService);

  products: ProductResponse[] = [];
  categoriesList: CategoryResponse[] = [];

  form: CreateProductRequest & { imageUrl?: string } = this.emptyForm();

  editing = false;
  selectedId?: string;
  search = '';

  // errorMessage = ''; no longer needed since we use AlertService

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
        error: (err) => {
          this.alertService.error('Error loading products', err?.error?.message);
        }
      });

  }

  loadCategories() {

    this.productService.getCategories()
      .subscribe({

        next: (data) => {
          this.categoriesList = data;
        },
        error: (err) => {
          this.alertService.error('Error loading categories', err?.error?.message);
        }
      });

  }

  // ================= SAVE =================

  save() {
    if (!this.form.name || !this.form.price || !this.form.categoryId) {
      this.alertService.warning('Campos incompletos', 'Por favor llena el nombre, precio y categoría.');
      return;
    }

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
        this.alertService.success(this.editing ? 'Product updated' : 'Product created');
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => {
        this.alertService.error('Error saving product', err?.error?.message);
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
          this.alertService.success('Availability updated');
          this.loadProducts();
        },
        error: (err) => {
          this.alertService.error('Error updating availability', err?.error?.message);
        }
      });

  }

  toggleActive(id: string) {

    this.productService.toggleActive(id)
      .subscribe({
        next: () => {
          this.alertService.success('Status updated');
          this.loadProducts();
        },
        error: (err) => {
          this.alertService.error('Error updating status', err?.error?.message);
        }
      });

  }

  // ================= RESET =================

  resetForm() {

    this.form = this.emptyForm();
    this.editing = false;
    this.selectedId = undefined;
    this.imagePreview = null;

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
