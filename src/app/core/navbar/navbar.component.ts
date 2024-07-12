import { Component, EventEmitter, Output } from '@angular/core';
import { CoreService } from '../services/core.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { IProductInCart } from 'src/app/modules/products/interfaces/product.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  productsInCart: IProductInCart[] = [];
  sumItemsCart!:number

  constructor(
    private coreServices: CoreService,
    private dialog: MatDialog
  ) {

    this.getProductsInCart();
    this.showSum();
  }

  getProductsInCart() {
    this.coreServices.currentItems.subscribe((data) => {
      this.productsInCart = data;
    });
  }

  updateShowCartSidebar() {

    this.dialog.open(CartSidebarComponent, {
      data: {
        productsInCart: this.productsInCart,
        sumCart: this.sumItemsCart
      },
    });
  }

  showSum() {
    this.coreServices.currentSumItemsCart.subscribe(total => {
      this.sumItemsCart = total
    })
  }
}


// console.log('sumTotalProducts: ', {
//   isbn: "1020304050125",
//   name: "El niño con pijama a rayas",
//   current_price: "25.50",
//   image: "https://www.penguinlibros.com/mx/2898911-medium_default/el-nino-con-el-pijama-de-rayas.jpg",
//   quantity: 1
// }.current_price.substring(0, 4));
//   console.log('sumTotalProducts: ', Number({
//   isbn: "1020304050125",
//   name: "El niño con pijama a rayas",
//   current_price: "25.50",
//   image: "https://www.penguinlibros.com/mx/2898911-medium_default/el-nino-con-el-pijama-de-rayas.jpg",
//   quantity: 1
// }.current_price.substring(0, 4)));
