const jwt = require('jsonwebtoken')
const User = require('../models/userTable')

const authenticate = (req,res,next) => {

    try {
        const token = req.header('Authorization')
        console.log(token)
        const user = jwt.verify(token, 'Rockettt')
        console.log(user.userId)
        User.findByPk(user.userId).then(user =>{
            console.log(JSON.stringify(user))

            req.user = user // global key being attached to the user
            next()  // next is used to flow to next function which is expenseController.getExpense
        }).catch(err => {
            throw new Error(err)
        })

    }catch(err){
        console.log(err)
        return res.status(401).json({success:false})
    }
}

module.exports = {
    authenticate
}