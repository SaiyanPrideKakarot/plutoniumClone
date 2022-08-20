const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let author= req.body
    let authorCreated= await AuthorModel.create(author)
    res.send({msg: authorCreated})
}



module.exports.createAuthor= createAuthor
