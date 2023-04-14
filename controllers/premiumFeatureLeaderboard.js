const ETable = require('../models/expenseTable')
const myTable = require('../models/userTable')
const sequelize = require('../util/database')


const fetchUserLeaderBoard = async(req,res) =>{
    try{
        const leaderboardOfUsers = await myTable.findAll({
            attributes: ['id', 'name', [sequelize.fn('sum',sequelize.col('expenses.amount')), 'total_cost' ]],
            include: [
                {
                    model: ETable,
                    attributes:[]
                }
            ],
            group: ['ourUser.id'],
            order:['total_cost']
        })
        
        res.status(200).json(leaderboardOfUsers)

    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


module.exports = {
    fetchUserLeaderBoard
}


// const totalExpense = await ETable.findAll({
        //     attributes: ['ourUserId', [sequelize.fn('sum',sequelize.col('expenses.amount'), 'total_cost' )]],
        //     group: ['ourUserId']
        // })

// console.log(expenses)
        // expenses.forEach((exp)=>{
        //     if(totalExpense[exp.ourUserId]){
        //         totalExpense[exp.ourUserId] = totalExpense[exp.ourUserId] + exp.amount  
        //     }else{
        //         totalExpense[exp.ourUserId] = exp.amount  
        //     }
            
        // })
        // const leaderboardDetails = []
        // people.forEach((peo) =>{
        //     leaderboardDetails.push({name: peo.name, total_expense: totalExpense[user.id] || 0})
        // })
        // console.log(leaderboardDetails)
        // leaderboardDetails.sort((a,b) => b.total_expense-a.total_expense)