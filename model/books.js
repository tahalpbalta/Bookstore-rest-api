const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    year_of_pub:Number,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;