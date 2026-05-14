import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../../../core/models/Product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  private readonly productService = inject(ProductService);

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
      .subscribe(data => this.products = data);
  }

}
