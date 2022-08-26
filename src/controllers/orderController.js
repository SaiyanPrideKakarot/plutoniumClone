const { count } = require("console")
const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")

const createOrder = async function (req, res) {
    let newOrder = req.body
    let userId= newOrder.userId
    let productId= newOrder.productId
    if (!userId) {
        return res.send({ msg: "Enter valid User id" })
    } else if(!productId){
        return res.send({ msg: "Enter valid Product id" })
    } else {}
    let appUser= req.headers.isfreeappuser
    let amountZero= 0
    if(appUser === true){
        newOrder.amount= amountZero
         newOrder.isFreeAppUser= appUser
         let savedOrder = await orderModel.create(newOrder)
         res.send({ msg: savedOrder })
    } else if(userId.balance >= productId.price){
        await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {balance: userId.balance - productId.price}}
            )
        newOrder.amount= productId.price
        newOrder.isFreeAppUser= appUser
        let savedOrder = await orderModel.create(newOrder)
        res.send({ msg: savedOrder })
    } else {
        res.send({ msg: "Insufficient Balance"})
    }
}

module.exports.createOrder = createOrder
