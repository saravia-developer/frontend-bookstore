export interface IProduct {
  current_price: string;
  image: string;
  isbn: string;
  name: string;
}

export interface IProductInCart extends IProduct {
  quantity: number
}
