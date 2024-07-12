import { Component, Inject, Input, OnInit } from '@angular/core';
import { CoreService } from '../services/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct, IProductInCart } from 'src/app/modules/products/interfaces/product.interface';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
})
export class CartSidebarComponent {
  dialogData: IProductInCart[]  = [];
  cartTotalSum = 0

  constructor(
    public dialogRef: MatDialogRef<CartSidebarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public sum: any,
    private coreServices: CoreService
  ) {
    this.dialogData = this.data.productsInCart;
    this.updateCartTotalSum()
    // this.cartTotalSum = this.data.sumCart
  }

  getProductsInCart() {
    this.coreServices.currentItems.subscribe((data) => {
      this.dialogData = data;
    });
  }

  updateCartTotalSum() {
    this.coreServices.currentSumItemsCart.subscribe(sum => {
      this.cartTotalSum = sum
    })
  }

  refreshStatus() {
    this.getProductsInCart()
    this.updateCartTotalSum()
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
