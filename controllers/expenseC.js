const ETable = require('../models/expenseTable')



const addExpense = async (req, res, next) => {
    try{
        
    const {amount, description, category} = req.body

    const data = await ETable.create({ 
        amount: amount, 
        description: description, 
        category: category })

    res.status(201).json({ newExpenseDetail: data })
    } 
    catch(err){
        res.status(500).json({
            error:(err,'!description')
        })
    }
}



const getExpense = async (req, res, next) => {
    try {
        const expense = await ETable.findAll()
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
        await ETable.destroy({ where: { id: uId } })
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

