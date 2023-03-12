const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const expenseTable = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    name: {
        type: Sequelize.STRING,
    },
    
    email: {
        type: Sequelize.STRING,
        unique: true

    },
    password: {
        type: Sequelize.STRING,
    }
},
{
    timestamps: false
}
)   

module.exports = expenseTable