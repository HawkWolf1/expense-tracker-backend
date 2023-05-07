const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const orderTable = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING
},

{
    timestamps: false
}
)   

module.exports = orderTable