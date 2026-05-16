import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../../../core/models/Product.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../core/services/alert.service';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, SearchPipe, NgxPaginationModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  private readonly productService = inject(ProductService);
  private readonly alertService = inject(AlertService);

  search = '';
  page = 1;
  pageSize = 12;

  products: ProductResponse[] = [];

  get categories() {
    const counts: Record<string, number> = {};
    this.products.forEach(p => {
      const catName = p.categoryName || 'Uncategorized';
      counts[catName] = (counts[catName] || 0) + 1;
    });
    const max = Math.max(...Object.values(counts));
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / max) * 100)
    }));
  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe({
        next: data => this.products = data,
        error: err => this.alertService.error('Error al cargar productos', err?.error?.message)
      });
  }

}
