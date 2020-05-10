import * as mongoose from 'mongoose';

const CartDetailSchema = new mongoose.Schema({
  id: String,
  name: String,
  thumb: String,
  sku: String,
  parentSku: String,
  isBox: Boolean,
  quantity: Number,
  total: Number,
  subtotal: Number,
  totalDiscounted: Number,
  subtotalDiscounted: Number,
  boxTotal: Number,
  boxSubtotal: Number,
  boxTotalDiscounted: Number,
  boxSubtotalDiscounted: Number
});

const CartDetailModel = mongoose.model('CartDetail', CartDetailSchema, 'cartDetail');

const CartSchema = new mongoose.Schema({
  storeId: Number,
  total: Number,
  subtotal: Number,
  details: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cartDetail'
  }],
  totalDiscounted: Number,
  subtotalDiscounted: Number
});

const CartModel = mongoose.model('Cart', CartSchema);

export { CartModel, CartDetailModel };