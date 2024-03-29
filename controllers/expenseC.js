const ETable = require('../models/expenseTable')
const myTable = require('../models/userTable')
const sequelize = require('../util/database')
const AWS = require('aws-sdk')

require('dotenv').config() 


function uploadToS3(data, filename){
  console.log('filename:', filename)
  const BUCKET_NAME = 'expensetracker77';
  const IAM_USER_KEY = process.env.AWS_USER_KEY;
  const IAM_USER_SECRET = process.env.AWS_USER_SECRET;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET

  })
    const params ={
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: 'public-read'
    }

    return new Promise((resolve, reject) =>{
      s3bucket.upload(params, (err, s3response) => {
        if(err){
          console.log('something wrong', err)
          reject(err)
        }
        else{
          // console.log('success', s3response)
          resolve(s3response.Location)
        }
    })
      }  

    )}
    
  


const downloadExpense = async(req,res) => {
  try{
  const expenses = await req.user.getExpenses()
  console.log(expenses)

  const stringifiedExpenses = JSON.stringify(expenses) // only a string could be added to the file

  const userId = req.user.id
  const filename = `ETable${userId}/${new Date}.txt`
  console.log('filename:', filename)
  const fileUrl = await uploadToS3(stringifiedExpenses, filename)
  res.status(200).json({fileUrl, success:true})
  }
  catch(error){
    console.log(error)
    res.status(500).json({ success: false, message: 'Error downloading expenses' })
  }
}





const addExpense = async (req, res, next) => {
    const t = await sequelize.transaction()
    const { amount, description, category } = req.body;
  
    if (amount === undefined || amount.length === 0) {
      return res.status(400).json({ success: false, message: 'parameters missing' });
    }
  
    try {
      const expense = await ETable.create({ amount, description, category, ourUserId: req.user.id }, {transaction:t});
  
      const totalExpense = Number(req.user.totalExpenses) + Number(amount);
      console.log(totalExpense);
  
      await myTable.update(
        {
          totalExpenses: totalExpense,
        },
        {
          where: { id: req.user.id },
          transaction:t
        }
      )
      await t.commit()
      res.status(201).json({ expense: expense });
    } catch (err) {
      await t.rollback()
      return res.status(500).json({ success: false, error: err });
    }
  };




  const getExpense = async (req, res, next) => {
    try {
        const expense = await req.user.getExpenses()
        res.status(200).json({ ex: expense })
    } catch (error) {
        console.log('Get user is failing', JSON.stringify(error))
        res.status(500).json({ error: 'err' })
    }
}


// const getExpense = async (req, res, next) => {
//   try {
//       const page = parseInt(req.query.page);
//       const items_per_page = parseInt(req.query.items_per_page);
//       let total = 0;
      
//       const expenses = await req.user.getExpenses();

//       for (let i = 0; i < expenses.length; i++) {
//           total = total + expenses[i].amount;
//         }
    
//       const totalItems = expenses.length;

//       const result = await req.user.getExpenses({
//           offset: (page - 1) * items_per_page,
//           limit: items_per_page,
//         });

//         res.json({
//           result,
//           isPremium: req.user.premiumUser,
//           currentPage: page,
//           hasNextPage: page * items_per_page < totalItems,
//           hasPreviousPage: page > 1,
//           nextPage: page + 1,
//           previousPage: page - 1,
//           lastPage: Math.ceil(totalItems / items_per_page),
//           total,
//         });


//   } catch (error) {
//       console.log('Get user is failing', JSON.stringify(error))
//       res.status(500).json({ error: 'err' })
//   }
// }





const deleteExpense = async (req, res, next) =>{
    try{
        if(req.params.id == 'undefined'){
            console.log('ID is missing')
            return  res.status(400).json({ 
                                 err: 'ID is missing' })
        }
        const uId = req.params.id
        console.log(uId)

        const expense = await ETable.findOne({
          where: {
            id: uId,
            ourUserId: req.user.id
          }
        })
        const totalExpenses = await ETable.sum('amount', {
          where: { ourUserId: req.user.id }
        })
        const updatedTotalExpenses = totalExpenses - expense.amount

        const RowD = await ETable.destroy({ where: { id: uId, ourUserId : req.user.id} })

        await myTable.update(
          { totalExpenses: updatedTotalExpenses },
          { where: { id: req.user.id } }
        )
        
         if (RowD ===0){
            return res.status(404).json({success: false, message: 'expense doesnot belong to the user'})
         }
        res.sendStatus(200)                 
    }catch (err) {
                console.log('Not working', JSON.stringify(err))
                res.status(500).json(err)
            }        
}



module.exports = {
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpense
    
}

