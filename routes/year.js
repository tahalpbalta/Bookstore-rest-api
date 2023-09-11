const express = require('express');
const router = express.Router();
const Book = require('../model/books');


router.get('/yil/:year', async (req,res) => {
    try {
        const year = req.params.year;
        const booksByYop = await Book.find({year_of_pub : year});
        res.status(200).json(booksByYop);
    } catch(err){
        res.status(500).send('İstenilen yılda basılan kitaplar bulunmuyor.');
    }
});

module.exports = router;