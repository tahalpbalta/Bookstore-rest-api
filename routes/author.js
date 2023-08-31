const express = require('express');
const router = express.Router();
const Book = require('../model/books');

router.get('/yazar/:author', async (req,res) => {
    try {
        const author = req.params.author.toLowerCase();
        const booksByAuthor = await Book.find({author});
        res.status(200).json(booksByAuthor);
    } catch(err){
        res.status(500).send('İstenilen yazarın kitapları bulunmuyor.');
    }
});

module.exports = router;