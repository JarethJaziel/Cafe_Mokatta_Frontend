import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/Product.model';
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

  products: Product[] = [];

  form: Product = this.emptyForm();

  editing = false;
  selectedId?: number;

  ngOnInit() {
    this.loadProducts();
  }

  emptyForm(): Product {
    return {
      id: 0,
      name: '',
      category: '',
      price: 0,
      stock: 0,
      image: ''
    };
  }

  // En tu .ts
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // 1. Guardar el archivo en tu objeto de formulario (para enviarlo al backend)
      this.form.image = file;

      // 2. Crear una previsualización para el usuario
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }



  loadProducts() {
    this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  // ================= SAVE =================
  save() {

    if (this.editing && this.selectedId) {
      this.productService.updateProduct(this.selectedId, this.form)
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
  edit(product: Product) {
    this.form = { ...product };
    this.editing = true;
    this.selectedId = product.id;
  }

  // ================= DELETE =================
  delete(id: number) {
    this.productService.deleteProduct(id)
      .subscribe(() => this.loadProducts());
  }

  // ================= RESET =================
  resetForm() {
    this.form = this.emptyForm();
    this.editing = false;
    this.selectedId = undefined;
  }

  get categories() {
  const total = this.products.length;
  if (total === 0) return [];

  const counts = this.products.reduce((acc: any, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map(key => ({
    name: key,
    count: counts[key],
    percentage: (counts[key] / total) * 100
  }));
}

}
