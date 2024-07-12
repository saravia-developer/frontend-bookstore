import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import { IProduct } from './interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products!: IProduct[]
  constructor(
    private productServices: ProductsService
  ) {
    this.getBooks()
  }

  getBooks(){
    this.productServices.getProducts().subscribe(data => {
      // console.log(data.result.item.rows)
      this.products = data.result.item.rows;
    });
  }
}
