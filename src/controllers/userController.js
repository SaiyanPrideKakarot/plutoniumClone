const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register= async function(req, res){
    let newUser= req.body
    let savedUser= await userModel.create(newUser)
    res.send({savedUser})
}

const login= async function(req, res){
    let email= req.body.emailId
    let password= req.body.password
    let user= await userModel.findOne({emailId: email, password: password})
    if(!user){
        return res.send({status: false, msg: "Email or Password is incorrect"})
    }
    let token= jwt.sign(
        {
            userId: user._id.toString(),
            batch: "Plutonium",
            organisation: "FunctionUp"
        },
        "This is my unique secret key"
    )
    res.setHeader("x-auth-token", token)
    res.send({status:true, data:{token: token}})
}

const getUserById= async function(req, res){
    let token= req.headers["x-Auth-Token"]
    if(!token){
        token= req.headers["x-auth-token"]
    }
    if(!token){
        return res.send({status: false, msg:"Token must be present"})
    }
    let decodedToken= jwt.verify(token, "This is my unique secret key")
    if(!decodedToken){
        return res.send({status: false, msg: "Invalid Token"})
    }
    let userId= req.params.userId
    let userDetails= await userModel.findById(userId)
    if(!userDetails){
        return res.send({status: false, msg: "No such User exists"})
    }
    res.send({status: true, msg: userDetails})
}

const updateUserData= async function(req, res){
    let token= req.headers["x-Auth-Token"]
    if(!token){
        token = req.headers["x-auth-token"]
    }
    if(!token){
        return res.send({status: false, msg: "Invalid Token"})
    }
    let userId= req.params.userId
    let user= await userModel.findById(userId)
    if(!user){
        return res.send({status: false, msg: "No such User exists"})
    }
    let userData= req.body
    let updatedUser= await userModel.findOneAndUpdate(
        {_id: userId},
        {$set: userData},
        {new: true}
    )
    res.send({status: true, data: updatedUser})
}

const deleteUserData= async function(req, res){
    let token= req.headers["x-Auth-Token"]
    if(!token){
        token= req.headers["x-auth-token"]
    }
    if(!token){
        return res.send({status: false, msg: "Invalid Token"})
    }
    let userId= req.params.userId
    let user= await userModel.findById(userId)
    if(!user){
        return res.send({status: false, msg: "No such User exists"})
    }
    let deletedUser= await userModel.findOneAndUpdate(
        {_id: userId},
        {$set: {isDeleted: true}},
        {new: true}
    )
    res.send({status: true, data: deletedUser})
}

module.exports.register= register
module.exports.login= login
module.exports.getUserById= getUserById
module.exports.updateUserData= updateUserData
module.exports.deleteUserData= deleteUserData


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzBhNWQwMDhhY2U5ZTIyMjYwNzBkOTkiLCJiYXRjaCI6IlBsdXRvbml1bSIsIm9yZ2FuaXNhdGlvbiI6IkZ1bmN0aW9uVXAiLCJpYXQiOjE2NjE2MjM5MDl9.A34I5_LWwF8I7TBuV6uRGwFVAdcOj8ydPqp21V7LLJM