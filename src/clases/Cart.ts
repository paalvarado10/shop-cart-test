import CartDetail from "./CartDetail";

export default class Cart implements iCart {
  storeId: number;
  total: number;
  subtotal: number;
  details: CartDetail[];
  mapDetails: Map<string, CartDetail>;
  totalDiscounted?: number;
  subtotalDiscounted?: number;
  constructor(storeId: number, total?: number, subtotal?: number) {
    this.storeId = storeId;
    this.total = total || 0;
    this.subtotal = subtotal || 0;
    this.details = [];
    this.mapDetails = new Map();
  }

  getDetails() {
    return this.details;
  }

  reCalculateValues() {
    let total = 0;
    let subtotal = 0;
    for (const detail of this.details) {
      total += detail.getTotal() * detail.quantity;
      subtotal += detail.getSubtotal() * detail.quantity;
    }
    this.total = total;
    this.subtotal = subtotal;
  }

  addDetail(detail: CartDetail) {
    const mapDetails = this.mapDetails;
    const existingDetail = mapDetails.get(detail.id);
    if (!existingDetail) {
      mapDetails.set(detail.id, detail);
    } else {
      existingDetail.quantity += detail.quantity;
      mapDetails.set(detail.id, existingDetail);
    }
    this.mapDetails = mapDetails;
    this.details = Array.from(this.mapDetails.values());
    this.reCalculateValues();
  }

  subtractDetail(detail: CartDetail) {
    const existingDetail = this.mapDetails.get(detail.id);
    if (existingDetail) {
      if (existingDetail.quantity > detail.quantity) {
        existingDetail.quantity -= detail.quantity;
        this.mapDetails.set(detail.id, existingDetail);
      } else {
        this.mapDetails.delete(detail.id);
      }
      this.details = Array.from(this.mapDetails.values());
      this.reCalculateValues();
    }
  }

  clear () {
    this.mapDetails = new Map();
    this.details = Array.from(this.mapDetails.values());
    this.reCalculateValues();
  }

};