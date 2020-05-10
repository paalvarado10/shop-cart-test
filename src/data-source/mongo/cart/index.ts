import Cart from "../../../clases/Cart";
import CartDetail from "../../../clases/CartDetail";
import { CartModel, CartDetailModel } from "./schema";
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
      carts.push(cart);
    }
    return carts;
  }

  async getCart(storeId: number): Promise<Cart> {
    let items: any = await CartModel.find({ storeId }).exec();
    const carts = [];
    for (const item of items) {
      const cart = new Cart(item.storeId, item.subtotal, item.total);
      carts.push(cart);
    }

    if (!items.length) {
      const a = await this.createCart(storeId, 0, 0);
      carts.push(a);
    }

    return carts[0];

  }

  async updateCart(cart: Cart) {
    await CartModel.findOneAndUpdate({ _id: cart.storeId }, { ...cart }).exec();
  }

  async createCart(storeId: number, total: number = 0, subtotal: number = 0) {
    const newCart = await CartModel.create({ storeId, total, subtotal});
    console.log({ newCart });
    return new Cart(storeId, total, subtotal);
  }
};