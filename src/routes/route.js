const express = require('express');
const router = express.Router();

const AuthorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")
const PublisherController= require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createPublisher", PublisherController.createPublisher)

router.post("/createAuthor", AuthorController.createAuthor)

router.post("/createBook", BookController.createBook)

router.get("/updateBooks", BookController.updateBooks)

router.get("/updateBooksAgain", BookController.updateBooksAgain)

module.exports = router;