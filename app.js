const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express() 

const sequelize = require('./util/database')
const userRoutes = require('./Routes/user')


const ETable = require('./models/expenseTable')
const myTable = require('./models/userTable')


app.use(bodyParser.json({extended: false})) 
app.use(cors()) 
app.use(userRoutes) 


myTable.hasMany(ETable)  // these 2 lines are for establishing the relation between the usertable and expensetable.
ETable.belongsTo(myTable) // we have to put the primary key of user table as a foriegn key in expense table.



sequelize.sync().then(() => {
    app.listen(4000)
})
.catch((err) => console.log(err))