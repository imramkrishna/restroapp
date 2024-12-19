const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillingSchema = new Schema({
  table: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Billing', BillingSchema);