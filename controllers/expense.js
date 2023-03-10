const myTable = require('../models/expenseTable')


const addExpense = async (req, res, next) => {
    try{
        if(!req.body.description){
            throw new Error ('Descriptipon is required!')
        }
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    console.log(amount, description, category)

    const data = await myTable.create({ 
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
        const expense = await myTable.findAll()
        res.status(200).json({ expense })
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
        await myTable.destroy({ where: { id: uId } })
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