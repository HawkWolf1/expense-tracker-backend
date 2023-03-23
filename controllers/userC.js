const myTable = require('../models/userTable')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function checkString(str) {
    if(str == undefined || str.length === 0){
        return true
    } else{
        return false
    }
}

const addUser = async (req, res, next) => {
    try{
    const {name, email, password} = req.body

    if(checkString(name) || checkString(email) || checkString(password)){
        return res.status(400).json({ err: "Bad parameters . Something is missing"})
        }
    
    const saltrounds =10
    bcrypt.hash(password, saltrounds, async(err, hash) =>{
        console.log(err)
       
    await myTable.create({ 
    name, 
    email, 
    password: hash })

    res.status(201).json({ message: 'New User created Successfully!' }) 
})
    }catch(err){
    res.status(500).json(err)
    }
}

// this function will generate the token and we have to check when and where do we call this function
// we will call this when the user has succesfully logged in

function generateAccessToken(id, name){
    return jwt.sign({userId:id, name:name}, 'Rockettt')
}

const loginN = async (req, res, next) => {
    try{
    const {email, password} = req.body

    const xyz = await myTable.findAll({where :{email}})
        if(xyz.length >0){
            bcrypt.compare(password, xyz[0].password, (err,result) => {
                if(err){
                    res.status(500).json({success: false, message: 'We got some error'})
                }
                if(result===true){
                    res.status(200).json({success: true, message: 'Login is successful', token: generateAccessToken(xyz[0].id, xyz[0].name)})
                }
                else{
                  return res.status(400).json({success: false, message: 'Password is incorrect'})
                }
                
            })
           

        } else{
            return res.status(404).json({success: false, message: 'No such User exists'})
        }
    }catch(err){
        res.status(500).json({message: err, success: false})
    }
}



module.exports = {
    addUser,
    loginN
}