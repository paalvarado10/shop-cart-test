import Cart from "../clases/Cart";

export abstract class CartDataSource {
  abstract getCart(storeId: number): Promise<Cart>;
  abstract getCarts(storeId: number): Promise<Cart[]>;
  abstract updateCart(cart: Cart): void;
}