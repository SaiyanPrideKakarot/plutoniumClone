const { count } = require("console")
const BookModel= require("../models/bookModel")
const authorModel= require("../models/authorModel")
const { findOneAndUpdate } = require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find( {authorName : "HO" } )
    console.log(allBooks)
    if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
    else res.send({msg: "No books found" , condition: false})
}


const updateBooks= async function (req, res) {
    let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    let allBooks= await BookModel.findOneAndUpdate( 
        { authorName: "ABC"} , //condition
        { $set: data }, //update in data
        { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
     )
     
     res.send( { msg: allBooks})
}

const deleteBooks= async function (req, res) {
    // let data = req.body 
    let allBooks= await BookModel.updateMany( 
        { authorName: "FI"} , //condition
        { $set: {isDeleted: true} }, //update in data
        { new: true } ,
     )
     
     res.send( { msg: allBooks})
}

const getBooksByCB= async function(req, res){
    let authorIdOfCB= await authorModel.findOne({author_name: "Chetan Bhagat"}).select({author_id: 1})
    let booksByCB= await BookModel.find({author_id:{$eq: authorIdOfCB.author_id}})
    res.send({msg: booksByCB})
}

const updatePrice= async function(req, res){
    let result= await BookModel.findOneAndUpdate(
        {name: "Two states"},
        {$set: {price: 100}},
        {new: true},
    )
    let finalResult= await authorModel.findOne({author_id:{$eq: result.author_id}}).select({author_name:1, _id: 0})
    let Price= result.price
    res.send({msg:finalResult, Price})
}

const getAuthorWithBookRange= async function(req, res){
    let books= await BookModel.find({price: {$gte: 50}, price:{$lte: 100}}).select({author_id: 1})
    let result= await authorModel.find().select({author_name: 1, _id: 0})
    res.send({msg: result})
}
// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook= createBook
module.exports.getBooksByCB= getBooksByCB
module.exports.updatePrice= updatePrice
module.exports.getAuthorWithBookRange= getAuthorWithBookRange



module.exports.getBooksData= getBooksData
module.exports.updateBooks= updateBooks
module.exports.deleteBooks= deleteBooks
