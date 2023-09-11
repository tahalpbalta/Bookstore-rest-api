const express = require('express');
const router = express.Router();
const Book = require('../model/books');
const authenticateToken = require('../middleware/authenticate');

router.use(authenticateToken);

router.get('/tur/:genre', authenticateToken, async (req,res,next) => {
    try {
        const genre = req.params.genre.toLowerCase();
        const booksByGenre = await Book.find({genre});
        res.status(200).json(booksByGenre);
    } catch(err){
        res.status(500).send('İstenilen türde kitaplar bulunmuyor.');
    }
});

module.exports = router;