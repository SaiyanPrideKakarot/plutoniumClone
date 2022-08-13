const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        unique: true,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["action", "adventure", "mystery", "fiction", "comic", "education", "others"]
    },
    year: Number,
},
{timestamps: true})

module.exports = mongoose.model('Book', bookSchema)