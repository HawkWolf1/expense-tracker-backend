const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
  active: Boolean,
  expiresby: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);

module.exports = ForgotPassword;