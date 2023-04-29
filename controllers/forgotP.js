const uuid = require('uuid');
const Sib = require('sib-api-v3-sdk');


const client = Sib.ApiClient.instance
const myApiKey = client.authentications['api-key']
myApiKey.apiKey = process.env.API_KEY
const tranEmailApi = new Sib.TransactionalEmailsApi()
let content = new Sib.SendSmtpEmail()


const myTable = require('../models/userTable')
const forgotPassword = require('../models/forgotPTable');

require('dotenv').config() 





const forgotMyP = async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await myTable.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            await forgotPassword.create({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })
    
            content = {
                name: 'Avinash Singh', 
                sender: {email: 'singhavinash9fg@gmail.com'},
                to: [{email: email}],
                subject: 'Forgot password',
                textContent:'Reset your password here'
            }
                // html: `<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`,   
           
            await tranEmailApi.sendTransacEmail(content);   
            return res.status(202).json({message: 'Link to reset password sent to your mail ', success: true})
        } else {
            return res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }

module.exports = {
    forgotMyP
}