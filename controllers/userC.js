const myTable = require('../models/userTable')


const addUser = async (req, res, next) => {
    try{
        if(!req.body.email){
            throw new Error ('Descriptipon is required!')
        }
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    console.log(name, email, password)

    const data = await myTable.create({ 
        name: name, 
        email: email, 
        password: password })

    res.status(201).json({ newUserDetail: data })
    } 
    catch(err){
        res.status(500).json({
            error:(err,'!description')
        })
    }
}



const getUser = async (req, res, next) => {
    try {
        const userA = await myTable.findAll()
        res.status(200).json({userA})
    } catch (error) {
        console.log('Get user is failing', JSON.stringify(error))
        res.status(500).json({ error: 'err' })
    }
}



const deleteUser = async (req, res, next) =>{
    try{
        if(req.params.id == 'undefined'){
            console.log('ID is missing')
            return  res.status(400).json({ 
                                 err: 'ID is missing' })
        }
        const uId = req.params.id
        console.log(uId)
        await myTable.destroy({ where: { id: uId } })
        res.sendStatus(200)
    }catch (err) {
                console.log('Not working', JSON.stringify(err))
                res.status(500).json(err)
            }
        
}



module.exports = {
    addUser,
    getUser,
    deleteUser
}