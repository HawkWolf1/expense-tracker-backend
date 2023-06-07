const Razorpay = require('razorpay') 
const Order = require('../models/orderTable')
const myTable = require('../models/userTable')
const jwt = require('jsonwebtoken')

require('dotenv').config() 


const purchasePremium = async (req, res) => {
    try {
      const rzp = new Razorpay({
        key_id: 'rzp_test_NcGEHFu3c3oaSe',
        key_secret: 'f0dnSYIPQ5i7ecXnTzI8AXZK',
        ...(process.env.NODE_ENV === 'development' && { test: true }),
      });
      const amount = 7700;
  
      await rzp.orders.create({ amount, currency: 'INR' }, async (err, order) => {
        if (err) {
          throw new Error('Error creating razorpay order: ' + JSON.stringify(err));
        }
  
        const newOrder = new Order({
          paymentid: '', // Add the paymentid if available
          orderid: order.id,
          status: 'PENDING',
          userId: req.user._id, // Assuming the authenticated user's ID is available in req.user._id
        });
  
        await newOrder.save();
  
        return res.status(201).json({ order, key_id: rzp.key_id });
      });
    } catch (err) {
      console.log(err);
      res.status(403).json({ message: 'Something went wrong', error: err });
    }
  };



function generateAccessToken(_id, name, isPremiumUser){
    return jwt.sign({userId:_id, name:name, isPremiumUser}, 'Rockettt')
}



const updateTransactionStatus = async (req, res) => {
    try {
      const userId = req.user.id;
      const { payment_id, order_id } = req.body;
      const order = await Order.findOne({ orderid: order_id });
      const promise1 = order.updateOne({ paymentid: payment_id, status: 'SUCCESFUL' });
      const promise2 = myTable.findByIdAndUpdate(userId, { isPremiumUser: true });
  
      Promise.all([promise1, promise2])
        .then(() => {
          return res.status(202).json({ success: true, message: 'Transaction successful', token: generateAccessToken(userId, undefined, true) });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (err) {
      console.log(err);
      res.status(403).json({ message: 'Something went wrong in status', error: err });
    }
  };


module.exports = {
    purchasePremium,
    updateTransactionStatus
}