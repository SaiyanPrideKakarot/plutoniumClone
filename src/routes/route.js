const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const BookController2= require("../controllers/bookController2")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

router.post("/createBook", BookController2.createBook)

router.get("/bookList", BookController2.bookList)

router.post("/getBooksInYear", BookController2.getBooksInYear)

router.post("/getParticularBooks", BookController2.getParticularBooks)

router.post("/getXINRBooks", BookController2.getXINRBooks)

router.post("/getRandomBooks", BookController2.getRandombooks)

module.exports = router;