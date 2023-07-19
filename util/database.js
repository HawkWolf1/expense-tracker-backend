const Sequelize = require('sequelize')

require('dotenv').config() 

const sequelize = new Sequelize('practise', 'root', 'Bucketone23@', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize