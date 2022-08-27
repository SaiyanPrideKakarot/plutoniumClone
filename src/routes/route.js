const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const productController= require("../controllers/productController")
const orderController= require("../controllers/orderController")
const middlewares = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", middlewares.validation, userController.createUser)

router.post("/createProduct", productController.createProduct)

router.post("/createOrder", middlewares.validation, orderController.createOrder)





module.exports = router;