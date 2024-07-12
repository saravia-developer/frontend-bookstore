import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductInCart } from 'src/app/modules/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  // productos que hay en el carrito
  private items = new BehaviorSubject<IProductInCart[]>([]);
  currentItems = this.items.asObservable();

  // Para saber cual es la suma total que se encuentra en el carrito de compras
  sumItems = 0;
  private sumItemsCart = new BehaviorSubject<number>(this.sumItems);
  currentSumItemsCart = this.sumItemsCart.asObservable();

  addItem(item: IProductInCart) {
    if(this.filterDuplicateElement(item)) return;
    this.items.next([...this.items.getValue(), item]);
    this.sumTotalProducts();
  }

  filterDuplicateElement(item: IProductInCart) {
    const getValues = this.items.getValue()
    const searchValue = getValues.find(product => product.isbn === item.isbn)

    return searchValue ? searchValue : false
  }

  searchElement(item: IProductInCart) {
    const getValues = this.items.getValue()
    const searchValue = getValues.find(product => product.isbn === item.isbn)

    return searchValue
  }

  updateQuantity(item: IProductInCart) {
    console.log(item)
    const updatedItems = this.items.getValue().map(product => {
      if (product.isbn === item.isbn) {
        return { ...product, quantity: item.quantity };
      }
      return product;
    });

    console.log(updatedItems)
    this.items.next(updatedItems);
    this.sumTotalProducts();
  }

  sumTotalProducts() {
    this.currentItems.subscribe(data => {
      if(!data.length) return;

      let prices = data.map(el => Number(el.current_price.substring(0, 4)) * el.quantity);
      this.sumItems = prices.reduce(( a, b ) => a + b)
      console.log(this.sumItems)
      this.sumItemsCart.next(this.sumItems)
    })
  }

  deleteProduct(item: IProductInCart) {
    const deleteProduct = this.items.getValue().filter(e => e.isbn !== item.isbn);
    this.items.next(deleteProduct);
    console.log(this.deleteProduct)

    this.sumTotalProducts();
  }
}
