const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const isRegistered= async function(req, res, next){
    let email= req.body.emailId
    let password= req.body.password
    let user= await userModel.findOne()
    if(!user){
        return res.send({status: false, msg: "User not registered. Please register first."})
    }
    next()
}

let tokenCheck= function(req, res, next){
    let token= req.headers["x-auth-token"]
    let validToken= jwt.verify(token, 'This is my unique secret key')
    if(validToken){
        req.validToken= validToken
        next()
    } else {
        res.status(401).send({status: false, msg: "Invalid Token"})
    }
}

module.exports.isRegistered= isRegistered
module.exports.tokenCheck= tokenCheck