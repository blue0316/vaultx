/* eslint-disable no-undef */
const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  addr1: { type: String, required: true },
  addr2: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: Number, required: true },
  country: { type: String, enum: ['ca', 'us', 'uk', 'aus'] },
  totalprice: { type: Number },
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
});

module.exports.OrderModel = model('order', OrderSchema);
