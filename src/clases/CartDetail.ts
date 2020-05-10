export default class CartDetail implements iCartDetail {
  id: string;
  name: string;
  thumb: string;
  sku: string;
  parentSku?: string;
  isBox: boolean;
  quantity: number;
  total: number;
  subtotal: number;
  totalDiscounted?: number;
  subtotalDiscounted?: number;
  boxTotal?: number;
  boxSubtotal?: number;
  boxTotalDiscounted?: number;
  boxSubtotalDiscounted?: number;
  constructor(
    id: string,
    name: string,
    thumb: string,
    sku: string,
    quantity: number,
    total: number,
    subtotal: number,
    isBox: boolean,
    totalDiscounted?: number,
    subtotalDiscounted?: number,
    parentSku?: string,
    boxTotal?: number,
    boxSubtotal?: number,
    boxTotalDiscounted?: number,
    boxSubtotalDiscounted?: number
  ) {
    this.id = id;
    this.name = name;
    this.thumb = thumb;
    this.sku = sku;
    this.isBox = isBox;
    this.quantity = quantity;
    this.total = total;
    this.subtotal = subtotal;
    this.totalDiscounted = totalDiscounted;
    this.subtotalDiscounted = subtotalDiscounted;
    this.parentSku = parentSku;
    this.boxTotal = boxTotal;
    this.boxSubtotal = boxSubtotal;
    this.boxTotalDiscounted = boxTotalDiscounted;
    this.boxSubtotalDiscounted = boxSubtotalDiscounted;
  }

  getTotal() {
    let total = this.total;
    if (this.totalDiscounted) total = this.totalDiscounted;
    return total;
  }
  getSubtotal() {
    let subtotal = this.subtotal;
    if (this.subtotalDiscounted) subtotal = this.subtotalDiscounted;
    return subtotal;
  }
  returnAvailableValues () {
    
    const object: iCartDetail= {
      id: this.id,
      name: this.name,
      thumb: this.thumb,
      sku: this.sku,
      quantity: this.quantity,
      total: this.total,
      subtotal: this.subtotal,
      isBox: this.isBox
    };
    if (this.totalDiscounted) {
      object.totalDiscounted = this.totalDiscounted
    }
    if (this.subtotalDiscounted) {
      object.subtotalDiscounted = this.subtotalDiscounted
    }
    if (this.parentSku) {
      object.parentSku = this.parentSku
    }
    if (this.boxTotal) {
      object.boxTotal = this.boxTotal
    }
    if (this.boxSubtotal) {
      object.boxSubtotal = this.boxSubtotal
    }
    if (this.boxTotalDiscounted) {
      object.boxTotalDiscounted = this.boxTotalDiscounted
    }
    if (this.boxSubtotalDiscounted) {
      object.boxSubtotalDiscounted = this.boxSubtotalDiscounted
    }
    return object;
  }
}