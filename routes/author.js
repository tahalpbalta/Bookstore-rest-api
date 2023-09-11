const express = require('express');
const router = express.Router();
const Book = require('../model/books');
const Author = require('../model/author');


router.post('/yazar-ekle',async (req,res,) => {
    try{
        const { name, birthdate, nationality } = req.body;
        const newAuthor = new Author({name, birthdate, nationality});
        await newAuthor.save();
        res.status(200).json('yazar başarıyla kaydedildi.');
    } catch (err) {
        res.status(500).json('yazar eklenemedi.');
    }
});

router.get('/yazarlar', async (req,res) => {
    try{
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json('Yazarlar alınamadı');
    }
});

router.get('/yazar/:author',  async (req, res) => {
    try {
      const authorName = req.params.author.toLowerCase();
      const author = await Author.findOne({ name: authorName });
      if (!author) {
        return res.status(404).json({ message: 'Yazar bulunamadı' });
      }
      const booksByAuthor = await Book.find({ author: authorName });

      res.status(200).json({ author, books: booksByAuthor });
    } catch (err) {
      res.status(500).json('Yazar ve kitapları alınamadı.');
    }
});

module.exports = router;