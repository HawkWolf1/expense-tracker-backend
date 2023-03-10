const path = require('path')
const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express() 

const sequelize = require('./util/database')
const userRoutes = require('./expenseRoutes/user')


app.use(bodyParser.json({extended: false})) 
app.use(cors()) // allows cross origin request from anywhere and everywhere
app.use(userRoutes)


sequelize.sync().then(() => {
    app.listen(4000)
})
.catch((err) => console.log(err))