const Razorpay = require('razorpay') // imports the razorpay package to be used for making projects
const Order = require('../models/orderTable')
const jwt = require('jsonwebtoken')

require('dotenv').config() // to import environment variables from the env file

const purchasePremium = async(req,res)=>{
    try{
        const rzp= new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID, // .env becasue these are the secrets/keys which you dont want to put into the gits
            key_secret: process.env.RAZORPAY_KEY_SECRET,
            ...(process.env.NODE_ENV === 'development' && {test:true}) // test mode would be active only when current environment is of development
        })
        const amount = 7700
        
        // we are calling the create method of orders object of razorpay instance. properties are set to be amount and currency.
        await rzp.orders.create({amount, currency:'INR'}, (err,order)=>{
            if (err){
                throw new Error('Error creating razorpay order: ' + JSON.stringify(err))
            }
            // we have one to many relationship between user and ordertable. req.user means current user which then creates an order on the order table.
            req.user.createOrder({orderid: order.id, status:'PENDING'}).then(()=>{  // req.user refers to the currently authenticated user
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

function generateAccessToken(id, name, isPremiumUser){
    return jwt.sign({userId:id, name:name, isPremiumUser}, 'Rockettt')
}



const updateTransactionStatus = async (req,res) => {
    try{
        const userId = req.user.id
        const {payment_id, order_id} = req.body // payment id and order id are extracted using destructuring
        const order = await Order.findOne({where: {orderid: order_id}})
        const promise1 = order.update({paymentid: payment_id, status: 'SUCCESFUL'})
        const promise2 = req.user.update({isPremiumUser : true})


        Promise.all([promise1, promise2]).then(()=>{
            return res.status(202).json({success:true, message:'Transaction succesful', token:generateAccessToken(userId, undefined, true) })
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