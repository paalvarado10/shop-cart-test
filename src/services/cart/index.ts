import Cart from "../../clases/Cart";
import CartDetail from "../../clases/CartDetail";
import { CartRepository } from "../../repositories/cart/index";
const cartRepository = new CartRepository();

async function get(storeId: number): Promise<Cart> {
  const cart = await cartRepository.getCart(storeId);
  return cart;
}

async function update(
  storeId:number, adetail: iCartDetail, add: boolean
): Promise<Cart> {
  const cart = await cartRepository.getCart(storeId);
  console.log('here all ready got')
  const { id: detailId, name, thumb, sku, quantity, total, subtotal, isBox } = adetail;
  let allReadyUpdated = false;
  for (const detail of cart.details) {
    if (detail.id === detailId) {
      const d = detail.returnAvailableValues();
      const newDetail = new CartDetail(
        detailId,
        name || d.name,
        thumb || d.thumb,
        sku || d.sku, 
        quantity,
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
      allReadyUpdated = true;
      break;
    }
  }
  if (!allReadyUpdated && add) {
    const newDetail = new CartDetail(
      detailId, name, thumb, sku, quantity, total, subtotal, isBox
    );
    cart.addDetail(newDetail);
  }
  await cartRepository.updateCart(cart);
  return cart;
}

export {
  get,
  update
};