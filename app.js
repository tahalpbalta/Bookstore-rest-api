const express = require('express');
const mongoose = require('mongoose');
const book = require('./routes/book');
const author = require('./routes/author');
const year = require('./routes/year');
const app = express();

const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/bookstore',{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB bağlantısı başarılı');
})
.catch((error) =>{
    console.error('MongoDB bağlantısı hatası', error);
});

app.use(express.json());
app.use('/', book);
app.use('/', author);
app.use('/', year);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});