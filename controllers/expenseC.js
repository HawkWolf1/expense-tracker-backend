const ETable = require('../models/expenseTable')
const myTable = require('../models/userTable')
const sequelize = require('../util/database')

const downloadExpense = async(req,res) => {
  const expenses = await req.user.getExpenses()
  console.log(expenses)



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

