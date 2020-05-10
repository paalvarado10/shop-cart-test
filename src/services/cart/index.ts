import Cart from "../../clases/Cart";
import CartDetail from "../../clases/CartDetail";
import { updateCart, getCart } from "../../data-source/firebase/cart";

async function get(storeId: number): Promise<Cart> {
  const cart = await getCart(storeId);
  return cart;
}

async function update(
  storeId: number,
  detailId: string,
  quantity: number,
  add: boolean = true,
  name?: string,
  thumb?: string,
  sku?: string,
  total?: number,
  subtotal?: number,
  isBox?: boolean
): Promise<Cart> {
  const cart = await getCart(storeId);
  for (const detail of cart.details) {
    if (detail.id === detailId) {
      const d = detail.returnAvailableValues();
      const newDetail = new CartDetail(
        detailId,
        name || d.name,
        thumb || d.thumb,
        sku || d.sku, quantity,
        total || d.total,
        subtotal || d.subtotal,
        isBox || d.isBox
      );
      newDetail.quantity = quantity;
      if (add) {
        cart.addDetail(newDetail);
      } else {
        cart.subtractDetail(newDetail);
      }
    }
  }
  await updateCart(cart);
  return cart;
}

export {
  get,
  update
};