const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const ETable = require('../models/userTable');
const forgotPTable = require('../models/forgotPTable');

const forgotMyP = async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await ETable.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            user.createforgotPTable({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

            sgMail.setApiKey(process.env.SENGRID_API_KEY)

            const msg = {
                to: email, // Change to your recipient
                from: 'singhavinash9fg@gmail.com',
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                // html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            }

            sgMail
            .send(msg)
            .then((response) => {

                // console.log(response[0].statusCode)
                // console.log(response[0].headers)
                return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', success: true})

            })
            .catch((error) => {
                throw new Error(error);
            })

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}

module.exports = {
    forgotMyP
}








// const express = require('express');
// const router = express.Router();
// const uuid = require('uuid');
// const Sib = require('sib-api-v3-sdk');
// const bcrypt = require('bcrypt');

// const client = Sib.ApiClient.instance
// const myApiKey = client.authentications['api-key']
// const tranEmailApi = new Sib.TransactionalEmailsApi


// const myTable = require('../models/userTable')
// const forgotPassword = require('../models/forgotPTable');

// require('dotenv').config() 

// const forgotMyP = async (req, res) => {
//     try {
//         const { email } =  req.body;
//         const user = await myTable.findOne({where : { email }});
//         console.log(user)
//         if(user){
//             const id = uuid.v4();
//             await forgotPassword.create({ id , active: true })
//             .create({ id, active: true })
//                 .catch(err => {
//                     throw new Error(err)
//                 })

//             myApiKey.apiKey = process.env.API_KEY
//             // sgMail.setApiKey(process.env.API_KEY)
            
//             const sender = {
//                 email: 'singhavinash9fg@gmail.com'
//             }
            
//             const receivers = [
//                 {
//                     email:email
//                 }
//             ]
            
            
//             const emailData = {
//                 sender,
//                 to: receivers,
//                 Subject: 'Forgot password',
//                 textContent: `Reset your password here`
//             }
//                 // to: email, 
//                 // from: 'singhavinash9fg@gmail.com', 
//                 // subject: 'Reset Your Password Here',
//                 // text: 'Now you can reset your password',
//                 // html: `<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`,
            
//                 const sendSmtpEmail = new Sib.SendSmtpEmail(emailData);
//             await tranEmailApi.sendTransacEmail(sendSmtpEmail);
//             return res.status(202).json({message: 'Link to reset password sent to your mail ', success: true})
//         } else {
//             return res.status(404).json({ message: 'User not found' });
//           }
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json({ message: 'Internal server error' });
//         }
//       }

// module.exports = {
//     forgotMyP
// }



