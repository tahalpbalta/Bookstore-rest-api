const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:String,
    birthdate:String,
    nationality:String,
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;

