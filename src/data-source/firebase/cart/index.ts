import Cart from "../../../clases/Cart";
import { firebase } from "../index";
// import { getAll, get } from "../utils";
import CartDetail from "../../../clases/CartDetail";

import { CartDataSource } from "../..";

export class FirebaseCart extends CartDataSource {
  async getCarts(storeId: number): Promise<Cart[]> {
    const allDocuments =  await firebase.collection('carts').where('storeId', '==', storeId).get();
    const cartData = [];
    for(const doc of allDocuments.docs){
      const dataFromDocument = doc.data()
      cartData.push({ dataFromDocument, doc, id: doc.id });
    }
    const storeCarts: Cart[] = [];
    if (cartData.length) {
      for (const item of cartData) {
        const { dataFromDocument, id } = item;
        const cart = new Cart(dataFromDocument.storeId, 0, 0);
        const detailReferences = await firebase.collection('carts').doc(id).collection('details').get();
        for (const doc of detailReferences.docs) {
          const documentData = doc.data();
          const { id: detailId, name, isBox, quantity, thumb, sku, total, subtotal } = documentData;
          const detail = new CartDetail(detailId, name, thumb, sku, quantity, total, subtotal, isBox );
          cart.addDetail(detail);
        }
        await this.updateCart(cart);
        storeCarts.push(cart);
      }
    }
    return storeCarts;
  }

  async getCart(storeId: number): Promise<Cart> {
    const allDocuments =  await firebase.collection('carts').where('storeId', '==', storeId).get();
    const cartData = [];
    for(const doc of allDocuments.docs){
      const dataFromDocument = doc.data()
      cartData.push({ dataFromDocument, doc, id: doc.id });
    }
    let cart: Cart;
    if (cartData.length) {
      const item = cartData [0];
        const { dataFromDocument, id } = item;
        cart = new Cart(dataFromDocument.storeId, 0, 0);
        const detailReferences = await firebase.collection('carts').doc(id).collection('details').get();
        for (const doc of detailReferences.docs) {
          const documentData = doc.data();
          const { id: detailId, name, isBox, quantity, thumb, sku, total, subtotal } = documentData;
          const detail = new CartDetail(detailId, name, thumb, sku, quantity, total, subtotal, isBox );
          cart.addDetail(detail);
        }
        await this.updateCart(cart);
        return cart;
    }
    const newCart = await this.createCart(storeId);
    return newCart
  }

  async updateCart(cart: Cart) {
    const cartRef = firebase.collection('carts').doc(`${cart.storeId}`);
    const detailRef = cartRef.collection('details');
    const allDocuments = await detailRef.get();
    for(const doc of allDocuments.docs){
      firebase.collection('carts').doc(`${cart.storeId}`).collection('details').doc(doc.id).delete();
    }
    for (const detail of cart.details) {
      await cartRef.collection('details').doc(detail.id).set({
        ...detail.returnAvailableValues()
      })
    }
    await cartRef.set({
      storeId: cart.storeId,
      subtotal: cart.subtotal,
      total: cart.total
    })
  }

  async createCart(storeId: number, total: number = 0, subtotal: number = 0) {
    const newCart = new Cart(storeId, total,subtotal);
    await firebase.collection('carts').doc(`${storeId}`).set({
      storeId: newCart.storeId,
      subtotal: newCart.subtotal,
      total: newCart.total
    })
    return newCart
  }

  async deleteCart(cart: Cart) {
    console.info(`Deleting cart ${cart.storeId}`);
    await firebase.collection('carts').doc(`${cart.storeId}`).delete();
    console.info(`Cart ${cart.storeId} deleted`);
  }
};