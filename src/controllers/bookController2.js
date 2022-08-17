const BookModel2 = require('../models/bookModel2')

const createBook = async function(req, res){
    let data= req.body
    let savedData= await BookModel2.create(data)
    res.send({msg: savedData})
}

const bookList= async function(req, res){
    let allBooks= await BookModel2.find().select({bookName: 1, authorName: 1, _id= 0})
    res.send({msg: allBooks})
}

const getBooksInYear= async function(req, res){
    let data= req.body
    let booksInYear= await BookModel2.find({year:{$eq: data}})
    res.send({msg: booksInYear})
}

const getParticularBooks= async function(req, res){
    let data= req.body
    let particularBooks= await BookModel2.find({
        $or: [{bookName: data.bookName},
            {price: data.price},
            {year: data.year},
            {authorName: data.authorName},
            {totalPages: data.totalPages},
            {stockAvailable: data.stockAvailable}]
        })
    res.send({msg: particularBooks})
}

const getXINRBooks= async function(req, res){
    let XINRBooks= await BookModel2.find({$or:[{price: 100}, {price: 200}, {price: 500}]})
    res.send({msg: XINRBooks})
}

const getRandombooks= async function(req, res){
    let randomBooks= await BookModel2.find({
        $or[
            {stockAvailable: true},
            {totalPages: {$gt: 500}}
        ]
    })
    res.send({msg: randomBooks})
}


module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandombooks= getRandombooks