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

const isLoggedIn= async function(req, res, next){
    let token= req.headers["x-Auth-Token"]
    if(!token){
        token= req.headers["x-auth-token"]
    }
    if(!token){
        return res.send({status: false, msg:"Token must be present"})
    }
    next()
}

module.exports.isRegistered= isRegistered
module.exports.isLoggedIn= isLoggedIn