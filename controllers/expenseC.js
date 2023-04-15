const ETable = require('../models/expenseTable')
const myTable = require('../models/userTable')


const addExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;
  
    if (amount === undefined || amount.length === 0) {
      return res.status(400).json({ success: false, message: 'parameters missing' });
    }
  
    try {
      const expense = await ETable.create({ amount, description, category, ourUserId: req.user.id });
  
      const totalExpense = Number(req.user.totalExpenses) + Number(amount);
      console.log(totalExpense);
  
      await myTable.update(
        {
          totalExpenses: totalExpense,
        },
        {
          where: { id: req.user.id },
        }
      )
  
      res.status(201).json({ expense: expense });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  };

  
  
  
  
  
  
    // try{
        
    // const {amount, description, category} = req.body

    // const data = await ETable.create({ 
    //     amount, 
    //     description, 
    //     category,
    //     ourUserId : req.user.id
    //  })

    // res.status(201).json({ newExpenseDetail: data })
    // } 
    // catch(err){
    //     res.status(500).json({
    //         error:(err,'!description')
    //     })
    // }




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
        const Row = await ETable.destroy({ where: { id: uId, ourUserId : req.user.id
         } })
         if (Row ===0){
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
    deleteExpense
}

