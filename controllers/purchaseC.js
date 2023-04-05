const Razorpay = require('razorpay')
const Order = require('../models/orderTable')

require('dotenv').config()

const purchasePremium = async(req,res)=>{
    try{
        const rzp= new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID, // .env becasue these are the secrets/keys which you dont want to put into the gits
            key_secret: process.env.RAZORPAY_KEY_SECRET,
            ...(process.env.NODE_ENV === 'development' && {test:true})
        })
        const amount = 1000

        rzp.orders.create({amount, currency:'INR'}, (err,order)=>{
            if (err){
                throw new Error('Error creating razorpay order: ' + JSON.stringify(err))
            }
            req.user.createOrder({orderid: order.id, status:'PENDING'}).then(()=>{
                return res.status(201).json({order, key_id: rzp.key_id})

            }).catch(err =>{
                throw new Error('Error creating user : ' +JSON.stringify(err))
            })
        })

    } catch(err){
        console.log(err)
        res.status(403).json({message:'Something went wrong', error:err})     
    }
}


const updateTransactionStatus = async (req,res) => {
    try{
        
        const {payment_id, order_id} = req.body
        const order = await Order.findOne({where: {orderid: order_id}})
        const promise1 = order.update({paymentid: payment_id, status: 'SUCCESFUL'})
        const promise2 = req.user.update({isPremiumUser : true})

        
        Promise.all([promise1, promise2]).then(()=>{
            return res.status(202).json({success:true, message:'Transaction succesful'})
        }).catch((error) => {
            throw new Error(error)
        })

    }catch(err) {
        console.log(err)
        res.status(403).json({message:'Something went wrong in status', error:err})  
    }

}





module.exports = {
    purchasePremium,
    updateTransactionStatus
}