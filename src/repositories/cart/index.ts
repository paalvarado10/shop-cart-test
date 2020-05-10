import { CartDataSource } from "../../data-source";
import { FirebaseCart } from "../../data-source/firebase/cart";
import { MongoCart } from "../../data-source/mongo/cart";
import Cart from "../../clases/Cart";

export class CartRepository {
  dataSource: CartDataSource;
  constructor(dataSource?: string) {
    console.log({ dataSource })
    if (dataSource && dataSource === 'firebase') {
      this.dataSource = new FirebaseCart();
    } else {
      this.dataSource = new MongoCart();
    }
  }
  async getCart (storeId: number) {
    return this.dataSource.getCart(storeId);
  }
  async updateCart (cart: Cart) {
    return this.dataSource.updateCart(cart);
  }
};