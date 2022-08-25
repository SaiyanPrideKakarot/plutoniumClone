const { count } = require("console")
const orderModel = require("../models/orderModel")

const createOrder = async function (req, res) {
    let newOrder = req.body
    if (!newOrder.userId && !newOrder.productId) {
        res.send({ msg: "Not enough information present" })
    } else {
        let savedOrder = await orderModel.create(newOrder)
        res.send({ msg: savedOrder })
    }
}

module.exports.createOrder = createOrder
