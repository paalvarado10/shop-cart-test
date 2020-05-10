import Cart from "../../../clases/Cart";
import CartDetail from "../../../clases/CartDetail";
import { CartModel, CartDetailModel, CartDetailSchema } from "./schema";
import mongoose from 'mongoose';
import { CartDataSource } from "../..";
import { mongo } from '../../../config';
const MONGO_URI = mongo.uri || '';

export class MongoCart extends CartDataSource {
  constructor() {
    super();
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.once('open', () => {
      console.info('Connected to Mongo via Mongoose');
    });
    mongoose.connection.on('error', (err) => {
      console.error('Unable to connect to Mongo via Mongoose', err);
    });
  }
  async getCarts(storeId: number): Promise<Cart[]> {
    let items: any = await CartModel.find({ storeId }).exec();
    const carts = [];
    for (const item of items) {
      const cart = new Cart(item.storeId, item.subtotal, item.total);
      const details = item.get('details');
      for (const detail of details) {
        const newDetail = new CartDetail(
          detail.id,
          detail.name,
          detail.thumb,
          detail.sku,
          detail.quantity,
          detail.total,
          detail.subtotal,
          detail.isBox
        );
        cart.addDetail(newDetail);
      }
      carts.push(cart);
    }
    return carts;
  }

  async getCart(storeId: number): Promise<Cart> {
    const allCarts = await this.getCarts(storeId);
    return allCarts[0];
  }

  async updateCart(cart: Cart) {
    const actualCart = await CartModel.findOne({ storeId: cart.storeId }).exec();
    if (actualCart) {
      const cartdetails = cart.details;
      const formated = [];
      for (const detail of cartdetails) {
        formated.push({ ...detail.returnAvailableValues() });
      };
      const { _id: id } = actualCart;
      await CartModel.updateOne({ _id: id }, {
        total: cart.total, 
        subtotal: cart.subtotal, 
        details: formated
      }).exec();
    }
  }

  async createCart(storeId: number, total: number = 0, subtotal: number = 0) {
    await CartModel.create({ storeId, total, subtotal });
    return new Cart(storeId, total, subtotal);
  }

  async deleteCart(cart: Cart) {
    console.info(`Deleting cart ${cart.storeId}`);
    await CartModel.deleteOne({ storeId: cart.storeId }).exec();
    console.info(`Cart ${cart.storeId} deleted`);
  }
};