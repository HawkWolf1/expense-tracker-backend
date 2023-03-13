const myTable = require('../models/userTable')


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
    
        await myTable.create({ 
        name, 
        email, 
        password })

    res.status(201).json({ message: 'New User created Successfully!' })
        }catch(err){
        res.status(500).json(err)
    }
}



const loginN = async (req, res, next) => {
    try{
    const {email, password} = req.body

    const xyz = await myTable.findAll({where :{email}})
        if(xyz.length >0){
           if(xyz[0].password === password){
            return res.status(200).json({success: true, message: 'user logged in successfully'})
           } else{
            return res.status(400).json({success: false, message: 'check password!'})
           }
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