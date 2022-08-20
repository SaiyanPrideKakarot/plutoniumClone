const AuthorModel = require("../models/authorModel")
const BookModel= require("../models/bookModel")
const PublisherModel= require("../models/publisherModel")
const ObjectId= BookModel.ObjectId

const createBook= async function (req, res) {
    let book = req.body
    if((book.author== false) || (book.publisher== false)){
        res.send({msg: "This detail is required"})
    } else {
        let bookCreated = await BookModel.create(book)
        res.send({data: bookCreated})
    }
}

const getBooksData= async function (req, res) {
    let books = await BookModel.find().populate('author', 'publisher')
    res.send({data: books})
}

const updateBooks= async function(req, res){
    let result= await PublisherModel.updateMany(
        {name:["Penguin", "HarperCollins"]},
        {$set:{isHardCover: true}},
        {new: true}
        )
    res.send({msg: result})
}

const updateBooksAgain= async function(req, res){
    let authorRatings= await AuthorModel.find({ratings: {$gt: 3.5}}).select()
    let result= await BookModel.updateMany(
        {author: authorRatings},
        {$set:{price: +10}}
    )
    res.send({msg: result})
}


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.updateBooks= updateBooks
module.exports.updateBooksAgain= updateBooksAgain