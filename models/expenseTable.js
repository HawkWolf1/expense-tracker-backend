const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const expenseTable = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    amount: {
        type: Sequelize.INTEGER,
    },
    
    description: {
        type: Sequelize.STRING,
        unique: true

    },
    category: {
        type: Sequelize.STRING,
    }
},
{
    timestamps: false
}
)   

module.exports = expenseTable