import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductInCart } from 'src/app/modules/products/interfaces/product.interface';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-detail-cart-sidebar',
  templateUrl: './detail-cart-sidebar.component.html',
  styleUrls: ['./detail-cart-sidebar.component.scss']
})
export class DetailCartSidebarComponent {
  @Input() item!: IProductInCart
  @Output() emitDelete = new EventEmitter<boolean>(true)
  quantity = 1;

  constructor(
    private coreServices: CoreService
  ){}

  decrementQuantity() {
    if(this.quantity === 1) { return }
    this.quantity -= 1;
    console.log(this.quantity)
    this.updateQuantity()
  }

  incrementQuantity() {
    this.quantity = this.quantity + 1
    console.log(this.quantity)
    this.updateQuantity()
  }

  updateQuantity() {
    let productFound = this.coreServices.searchElement(this.item) as IProductInCart;
    productFound = { ...productFound, quantity: this.quantity }
    console.log(productFound)

    this.coreServices.updateQuantity(productFound);
  }

  deleteProduct(){
    // this.coreServices.currentSumItemsCart
    this.emitDelete.emit()
    this.coreServices.deleteProduct(this.item);
  }
}
