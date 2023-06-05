const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true,
  },
  paymentid: String,
  orderid: String,
  status: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MyTable',
  },
}, {
  timestamps: false
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;