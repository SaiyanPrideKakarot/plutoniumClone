const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const isRegistered = async function (req, res, next) {
    try {
        let email = req.body.emailId
        let password = req.body.password
        let user = await userModel.findOne()
        if (!user) {
            return res.status(403).send({ status: false, msg: "User not registered. Please register first." })
        }
        next()
    } catch (error) {
        console.log("This is the error=>", error)
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

let tokenCheck = function (req, res, next) {
    try {
        let token = req.headers["x-auth-token"]
        let validToken = jwt.verify(token, 'This is my unique secret key')
        if (validToken) {
            req.validToken = validToken
            next()
        } else {
            res.status(401).send({ status: false, msg: "Invalid Token" })
        }
    } catch (error) {
        console.log("This is the error=>", error)
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

module.exports.isRegistered = isRegistered
module.exports.tokenCheck = tokenCheck