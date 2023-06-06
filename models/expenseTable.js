const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
  amount: Number,

  description: {
    type: String
  },
  category: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: false
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;