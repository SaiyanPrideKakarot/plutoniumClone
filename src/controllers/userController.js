const userModel = require("../models/userModel")

const createUser= async function(req, res){
    let newUser= req.body
    let appUsser= req.headers.isfreeappuser
    newUser.isFreeAppUser= appUsser
    let savedUser= await userModel.create(newUser)
    res.send({msg: savedUser})
}



module.exports.createUser= createUser