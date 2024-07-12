import { Component, Input } from '@angular/core';
import { IProduct, IProductInCart } from '../../interfaces/product.interface';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() productData!: IProduct

  constructor(
    private coreService: CoreService
  ) {}

  addProductToCart(item: IProduct) {
    const itemInCart = { ...item, quantity: 1 }

    this.sumPriceCart()
    this.coreService.addItem(itemInCart)
  }

  sumPriceCart() {
    this.coreService.sumTotalProducts()
  }
}
