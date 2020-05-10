import Cart from "../clases/Cart";

export abstract class CartDataSource {
  abstract getCart(storeId: number): Promise<Cart>;
  abstract createCart(storeId: number, total?: number, subtotal?: number): Promise<Cart>;
  abstract updateCart(cart: Cart): void;
  abstract deleteCart(cart: Cart): void;
  abstract getCarts(storeId: number): Promise<Cart[]>;
}