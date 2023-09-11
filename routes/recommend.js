const express = require('express');
const router = express.Router();
const Book = require('../model/books');

const authenticate = require('../middleware/authenticate')
router.use(authenticate);

router.get('/oner', async (req,res) => {
    try {
        const recommendedBook = await Book.aggregate([{ $sample: { size: 1 } }]);
        res.status(200).json(recommendedBook);
    } catch(err){
        res.status(500).send('Suanda herhangi bir kitap öneremiyoruz.');
    }
});

module.exports = router;