import { Component, inject, OnInit } from '@angular/core';
import { ProductResponse, CreateProductRequest, UpdateProductRequest, CategoryResponse } from '../../../../core/models/Product.model';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-manager',
  imports: [FormsModule, CommonModule],
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Crear previsualización para el usuario
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        // TODO: Implementar servicio de file upload y asignar URL devuelta
        // this.form.imageUrl = uploadedUrl;
      };
      reader.readAsDataURL(file);
    }
  }

  loadProducts() {
    this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  loadCategories() {
    this.productService.getCategories()
      .subscribe(data => this.categoriesList = data);
  }

  // ================= SAVE =================
  save() {
    if (this.editing && this.selectedId) {
      const updatePayload: UpdateProductRequest = {
        name: this.form.name || undefined,
        description: this.form.description || undefined,
        price: this.form.price || undefined,
        categoryId: this.form.categoryId || undefined,
        imageUrl: this.form.imageUrl || undefined
      };

      this.productService.updateProduct(this.selectedId, updatePayload)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
        });

    } else {
      this.productService.createProduct(this.form)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
        });
    }
  }

  // ================= EDIT =================
  edit(product: ProductResponse) {
    this.form = {
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl
    };
    this.editing = true;
    this.selectedId = product.id;
    this.imagePreview = product.imageUrl || null;
  }

  // ================= TOGGLE =================
  toggleAvailable(id: string) {
    this.productService.toggleAvailable(id)
      .subscribe(() => this.loadProducts());
  }

  toggleActive(id: string) {
    this.productService.toggleActive(id)
      .subscribe(() => this.loadProducts());
  }

  // ================= RESET =================
  resetForm() {
    this.form = this.emptyForm();
    this.editing = false;
    this.selectedId = undefined;
    this.imagePreview = null;
  }

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
