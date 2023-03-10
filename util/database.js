const Sequelize = require('sequelize')

const sequelize = new Sequelize('vsc', 'root', 'Bucketone23@', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize