const ETable = require('../models/expenseTable')
const myTable = require('../models/userTable')
const sequelize = require('../util/database')


const fetchUserLeaderBoard = async(req,res) =>{
    try{
        const leaderboardOfUsers = await myTable.findAll({
            order:[['totalExpenses', 'DESC']]
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

