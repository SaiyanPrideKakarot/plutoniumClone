const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = async function (req, res) {
  try {
    let newUser = req.body
    console.log(newUser)
    if (Object.keys(newUser).length != 0) {
      let savedUser = await userModel.create(newUser)
      res.status(201).send({ savedUser })
    } else {
      res.status(400).send({ msg: "Bad Request" })
    }
  }
  catch (error) {
    console.log("This is the error=>", error)
    res.status(500).send({ msg: "Error", error: error.message })
  }
}

const login = async function (req, res) {
  try {
    let data = req.body
    let email = data.emailId
    let password = data.password
    if (Object.keys(data).length != 0) {
      let user = await userModel.findOne({ emailId: email, password: password })
      if (!user) {
        res.status(400).send({ status: false, msg: "Email or Password is incorrect" })
      } else {
        let payload = {
          userId: user._id.toString(),
          mobile: user.mobile,
          batch: "Plutonium",
          organisation: "FunctionUp"
        }
        let token = jwt.sign(payload, "This is my unique secret key")
        res.setHeader("x-auth-token", token)
        res.status(200).send({ status: true, data: { token: token } })
      }
    } else {
      res.status(400).send({ msg: "Bad Request" })
    }
  }
  catch (error) {
    console.log("This is the error=>", error)
    res.status(500).send({ msg: "Error", error: error.message })
  }
}

const getUserById = async function (req, res) {
  try {
    if (req.validToken._id == req.params.userId) {
      let user = await userModel.findOne({
        _id: req.params.userId,
        isDeleted: false
      })
      if (user) {
        res.status(200).send({ status: true, data: user })
      } else {
        res.status(404).send({ status: false, msg: "User not found" })
      }
    } else {
      res.status(403).send({ status: false, msg: "Not authorized" })
    }
  }
  catch (error) {
    console.log("This is the error=>", error)
    res.status(500).send({ msg: "Error", error: error.message })
  }
}

const updateUserData = async function (req, res) {
  try {
    let userId = req.params.userId
    if (req.validToken._id == userId) {
      let user = await userModel.findById(userId)
      if (user) {
        let userData = req.body
        let updatedUser = await userModel.findOneAndUpdate(
          { _id: userId },
          { $set: userData },
          { new: true }
        )
        res.status(200).send({ status: true, data: updatedUser })
      } else {
        res.status(404).send({ status: false, msg: "User not found" })
      }
    } else {
      res.status(403).send({ status: false, msg: "Not authorized" })
    }
  }
  catch (error) {
    console.log("This is the error=>", error)
    res.status(500).send({ msg: "Error", error: error.message })
  }
}

const deleteUserData = async function (req, res) {
  try {
    if (req.validToken._id == userId) {
      let userId = req.params.userId
      let user = await userModel.findById(userId)
      if (user) {
        let deletedUser = await userModel.findOneAndUpdate(
          { _id: userId },
          { $set: { isDeleted: true } },
          { new: true }
        )
        res.status(200).send({ status: true, data: deletedUser })
      } else {
        res.status(404).send({ status: false, msg: "User not found" })
      }
    } else {
      res.status(403).send({ status: false, msg: "Not authorized" })
    }
  } catch (error) {
    console.log("This is the error=>", error)
    res.status(500).send({ msg: "Error", error: error.message })
  }
}

module.exports.register = register
module.exports.login = login
module.exports.getUserById = getUserById
module.exports.updateUserData = updateUserData
module.exports.deleteUserData = deleteUserData