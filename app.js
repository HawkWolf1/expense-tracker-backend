const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express() 
const fs = require('fs')
const path = require('path')

app.use(cors()) 




const sequelize = require('./util/database')
const userRoutes = require('./Routes/user')
 


app.use(bodyParser.json({extended: false})) 

app.use(userRoutes) 




sequelize.sync().then(() => {
    app.listen(4000)
})
.catch((err) => console.log(err))