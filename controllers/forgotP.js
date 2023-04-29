const uuid = require('uuid');
const Sib = require('sib-api-v3-sdk');
const bcrypt = require('bcrypt');

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
                textContent:'Reset your password here',
                html: `<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`
            }  
           
            await tranEmailApi.sendTransacEmail(content);   
            return res.status(202).json({message: 'Link to reset password sent to your mail ', success: true, id:id})
        } else {
            return res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }



      const resetMyP = async (req, res) => {
        try {
            console.log('1')
            const { newpassword } = req.query;
            console.log('12')
            const { resetpasswordid } = req.params;
            console.log('13')
            forgotPassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
                console.log('14')
                myTable.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                    console.log('15')
                    // console.log('userDetails', user)
                    if(user) {
                        console.log('16')
                        //encrypt the password
    
                        const saltRounds = 10;
                        bcrypt.genSalt(saltRounds, function(err, salt) {
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            bcrypt.hash(newpassword, salt, function(err, hash) {
                                // Store hash in your password DB.
                                if(err){
                                    console.log(err);
                                    throw new Error(err);
                                }
                                myTable.update({ password: hash }).then(() => {
                                    res.status(201).json({message: 'Successfuly update the new password'})
                                })
                            });
                        });
                } else{
                    return res.status(404).json({ error: 'No user Exists', success: false})
                }
                })
            })
        } catch(error){
            return res.status(403).json({ error, success: false } )
        }
    
    }
    //   const resetMyP = (req, res) => {
    //     console.log('1')
    //     const {id} =  req.params;
    //     console.log('12')
    //     forgotPassword.findOne({ where : { id }}).then(forgotPasswordrequest => {
    //         console.log('123')
    //         if(forgotPasswordrequest){
    //             console.log('1234')
    //             forgotPasswordrequest.update({ active: false});
    //             res.status(200).send(`<html>
    //                                     <script>
    //                                         function formsubmitted(e){
    //                                             e.preventDefault();
    //                                             console.log('called')
    //                                         }
    //                                     </script>
    //                                     <form action="/password/updatepassword/${id}" method="get">
    //                                         <label for="newpassword">Enter New password</label>
    //                                         <input name="newpassword" type="password" required></input>
    //                                         <button>reset password</button>
    //                                     </form>
    //                                 </html>`
    //                                 )
    //             return res.end()
    
    //         }
    //     })
    // }
    



module.exports = {
    forgotMyP,
    resetMyP
}