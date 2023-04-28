//                 const itemsPerPage = 5;

//                 const expensesList = document.getElementById("listOfExpenses");

//                 const paginationDiv = document.createElement("div");
//                 paginationDiv.setAttribute("id", "paginationDiv")

//                 const totalExpenses = expensesList.children.length;
//                 const totalPages = Math.ceil(totalExpenses / itemsPerPage);

//                 let currentPage = 1;

//                 function showItemsPerPage() {
//                     const startIndex = (currentPage - 1) * itemsPerPage;
//                     const endIndex = startIndex + itemsPerPage;

//                     for (let i = 0; i < totalExpenses; i++) {
//                         if (i >= startIndex && i < endIndex) {
//                             expensesList.children[i].style.display = "block";
//                         } else {
//                             expensesList.children[i].style.display = "none";
//                         }
//                     }
//                     console.log(`Items per page shown: page ${currentPage}`);
//                 }

//                 function showPreviousPage() {
//                     if (currentPage > 1) {
//                         currentPage--;
//                         showItemsPerPage();
//                         console.log("A button clicked");
//                     }
//                 }

                
//                 function showNextPage() {
//                     if (currentPage < totalPages) {
//                         currentPage++;
//                         showItemsPerPage();
//                         console.log("Next button clicked");
//                     }
//                 }

//                 showItemsPerPage();

//                 paginationDiv.innerHTML = `
//                 <button id="prevButton">Prev</button>
//                 <button id="nextButton">Next</button>
//                 `

//                 expensesList.insertAdjacentElement("afterend", paginationDiv);
                
                
//                 const prevButton = document.getElementById("prevButton");
//                 const nextButton = document.getElementById("nextButton");

//                 prevButton.addEventListener("click", () => {
//                     showPreviousPage();
//                     console.log("Previous button clicked.");
//                 });

//                 nextButton.addEventListener("click", () => {
//                     showNextPage();
//                     console.log("Next button clicked.");
//                 })

  
//                 // prevButton.addEventListener("click", showPreviousPage);
//                 // nextButton.addEventListener("click", showNextPage);
//                 console.log('event listeners added')





// // .................................................................

// window.addEventListener("DOMContentLoaded", async(event) => {
//     const token = localStorage.getItem('token')
//     const decodeToken = parseJwt(token)
//     const isPremiumUser = decodeToken.isPremiumUser
    
//     if(isPremiumUser){
//      showPremiumUserMessage()                    
//      showLeaderboard()
//      download()                   
//     }
    
//     event.preventDefault()
//     try{
//         const page = 1
//         const itemsPerPage = 5
//         const expensesList = document.getElementById("listOfExpenses");

//     const xyz = await axios.get(`http://localhost:4000/expense/get-expense?page=${page}`, {headers: {'Authorization' : token}})
//     console.log(xyz)

//     const totalExpenses = xyz.data.ex.length;
//     const totalPages = Math.ceil(totalExpenses / itemsPerPage)

//     const paginationDiv = document.createElement("div");
//     paginationDiv.setAttribute("id", "paginationDiv")
//     expensesList.insertAdjacentElement("afterend", paginationDiv);

//     const prevButton = document.createElement("button");
//     prevButton.setAttribute("id", "prevButton");
//     prevButton.textContent = "Prev";
//     paginationDiv.appendChild(prevButton)

//     const nextButton = document.createElement("button");
//     nextButton.setAttribute("id", "nextButton");
//     nextButton.textContent = "Next";
//     paginationDiv.appendChild(nextButton);

//     prevButton.addEventListener("click", () => {
//         if (page > 1) {
//             page--;
//             showPage(page);
//         }
//     });

//     nextButton.addEventListener("click", () => {
//         if (page < totalPages) {
//             page++;
//             showPage(page);
//         }
//     });

//     function showPage(page){
//         const startIndex = (page - 1) * itemsPerPage;
//         const endIndex = Math.min(startIndex + itemsPerPage, totalExpenses)
    
//         for (let i = 0; i < totalExpenses; i++) {
//             if (i >= startIndex && i < endIndex) {
//                 expensesList.children[i].style.display = "block";
//             } else {
//                 expensesList.children[i].style.display = "none";
//             }
//         }

// }
//     showPage(page)
//          }catch(err){                       
//         console.log("Error Block: ",err)
//     }
  
// })





// // // # TOKEN_SECRET =
// // RAZORPAY_KEY_ID=rzp_test_KejApkBrX7U9oC
// // RAZORPAY_KEY_SECRET=XBBD0VRiMREsDkY4Llr3HuUX

// // AWS_USER_KEY=AKIA4SOW2FQHTQ6MYZXF
// // AWS_USER_SECRET=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









// ................................................................................



// // const uuid = require('uuid');
// // const sgMail = require('@sendgrid/mail');
// // const bcrypt = require('bcrypt');

// // const ETable = require('../models/userTable');
// // const forgotPTable = require('../models/forgotPTable');

// // const forgotMyP = async (req, res) => {
// //     try {
// //         const { email } =  req.body;
// //         const user = await ETable.findOne({where : { email }});
// //         if(user){
// //             const id = uuid.v4();
// //             user.createforgotPTable({ id , active: true })
// //                 .catch(err => {
// //                     throw new Error(err)
// //                 })

// //             sgMail.setApiKey(process.env.SENGRID_API_KEY)

// //             const msg = {
// //                 to: email, // Change to your recipient
// //                 from: 'singhavinash9fg@gmail.com',
// //                 subject: 'Sending with SendGrid is Fun',
// //                 text: 'and easy to do anywhere, even with Node.js',
// //                 // html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
// //             }

// //             sgMail
// //             .send(msg)
// //             .then((response) => {

// //                 // console.log(response[0].statusCode)
// //                 // console.log(response[0].headers)
// //                 return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', success: true})

// //             })
// //             .catch((error) => {
// //                 throw new Error(error);
// //             })

// //             //send mail
// //         }else {
// //             throw new Error('User doesnt exist')
// //         }
// //     } catch(err){
// //         console.error(err)
// //         return res.json({ message: err, sucess: false });
// //     }

// // }

// // module.exports = {
// //     forgotMyP
// // }








// // // const express = require('express');
// // // const router = express.Router();
// // const uuid = require('uuid');
// // const Sib = require('sib-api-v3-sdk');
// // // const bcrypt = require('bcrypt');

// // const client = Sib.ApiClient.instance
// // const myApiKey = client.authentications['SMTP']
// // const tranEmailApi = new Sib.TransactionalEmailsApi


// // const myTable = require('../models/userTable')
// // const forgotPassword = require('../models/forgotPTable');

// // require('dotenv').config() 

// // const forgotMyP = async (req, res) => {
// //     try {
// //         const { email } =  req.body;
// //         const user = await myTable.findOne({where : { email }});
// //         console.log(user)
// //         console.log("Email:", email);
// //         if(user){
// //             const id = uuid.v4();
// //             await forgotPassword.create({ id , active: true })
// //                 .catch(err => {
// //                     throw new Error(err)
// //                 })

// //             myApiKey.apiKey = process.env.SMTP_KEY
            
            
// //             const sender = {
// //                 email: 'singhavinash9fg@gmail.com'
// //             }
            
// //             const receivers = [
// //                 {
// //                     email:email
// //                 }
// //             ]
            
            
// //             const emailData = {
// //                 sender: sender,
// //                 to: receivers,
// //                 subject: 'Forgot password',
// //                 textContent: `Reset your password here`
// //             }
// //                 // to: email, 
// //                 // from: 'singhavinash9fg@gmail.com', 
// //                 // subject: 'Reset Your Password Here',
// //                 // text: 'Now you can reset your password',
// //                 // html: `<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`,
            
// //             const sendSmtpEmail = new Sib.SendSmtpEmail(emailData);
// //             await tranEmailApi.sendTransacEmail(sendSmtpEmail);
// //             return res.status(202).json({message: 'Link to reset password sent to your mail ', success: true})
// //         } else {
// //             return res.status(404).json({ message: 'User not found' });
// //           }
// //         } catch (error) {
// //           console.error(error);
// //           return res.status(500).json({ message: 'Internal server error' });
// //         }
// //       }

// // module.exports = {
// //     forgotMyP
// // }



