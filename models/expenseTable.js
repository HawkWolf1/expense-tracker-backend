const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true,
  },
  amount: Number,

  description: {
    type: String,
    unique: true,
  },
  category: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'myTable',
  },
}, {
  timestamps: false
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;