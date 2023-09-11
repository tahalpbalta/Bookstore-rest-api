const express = require('express');
const router = express.Router();
const Book = require('../model/books');


router.post('/kitap-ekle',  async (req,res) =>{
    try {
        const {title, author, genre, year_of_pub} = req.body;
        const  newBook = new Book({title, author, genre, year_of_pub});
        await newBook.save();
        res.status(201).json('Kitap Kaydedilmistir.');
    } catch (err) {
        res.status(500).json('Kitap Kaydedilemedi');
        console.error(err);
    }
});

router.get('/kitap', async (req,res) =>{
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (err) {
        res.status(500).send('kitaplar alinilamadi');
    } 
});

router.put('/kitap/:id', async (req,res) =>{
    try {
        const {title, author, genre, year_of_pub} = req.body;
        
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {title, author, genre, year_of_pub},
            {new: true}
        );
        res.status(201).json(updatedBook);
    } catch (err) {
        res.status(500).send('islem gerçeklestirilemedi');
    }
});

router.delete('/kitap/:id', async (req,res) =>{
    try{ 
        const deletedBook = await Book.findByIdAndRemove(req.params.id);
        res.status(200).send('kitap silindi');
    } catch(err) {
        res.status(500).send('islem gerceklestirilemedi');
    }
});

module.exports = router;