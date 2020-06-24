const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  items: [{ item: String, quantity: String, prixMax: String }],
  prixMax: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: String,
    required: true,
    default: 'Nouveau'
  },
  note: {
    type: String,
  }
});

module.exports = mongoose.model('Order', OrderSchema);
