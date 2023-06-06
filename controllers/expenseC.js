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
  const { amount, description, category } = req.body;

  if (!amount || !description || !category) {
    return res.status(400).json({ success: false, message: 'Missing parameters' });
  }

  try {
    const expense = new ETable({ amount, description, category, userId: req.user._id });
    await expense.save();

    const totalExpense = req.user.totalExpenses + Number(amount);

    req.user.totalExpenses = totalExpense;
    await req.user.save();

    res.status(201).json({ success: true, expense });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};




const getExpense = async (req, res, next) => {
  const page = Number(req.query.page) - 1;
  const items = Number(req.query.items);
  try {
    const expense = await ETable.find({ userId: req.user._id })
      .skip(page * items)
      .limit(items);

    const count = await ETable.countDocuments({ userId: req.user._id });

    res.status(200).json({ ex: {expense, count} });


  } catch (error) {
    console.log('Get expenses failed', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




const deleteExpense = async (req, res, next) => {
  try {
    if (req.params.id === undefined) {
      console.log('ID is missing');
      return res.status(400).json({ err: 'ID is missing' });
    }
    const expenseId = req.params.id;
    console.log(expenseId);

    const expense = await ETable.findOneAndDelete({
      _id: expenseId,
      userId: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense does not belong to the user' });
    }

    const totalExpenses = await ETable.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const updatedTotalExpenses = totalExpenses.length > 0 ? totalExpenses[0].total : 0;

    await myTable.updateOne({ _id: req.user._id }, { $set: { totalExpenses: updatedTotalExpenses } });

    res.sendStatus(200);
  } catch (err) {
    console.log('Not working', JSON.stringify(err));
    res.status(500).json(err);
  }
};




module.exports = {
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpense
    
}

