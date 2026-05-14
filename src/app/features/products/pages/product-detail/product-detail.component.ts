import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from '../../../../core/models/Product.model';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  product?: ProductResponse;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(id)
      .subscribe(data => this.product = data);
  }

}
