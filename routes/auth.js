const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'cokgizlianahtar';


router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Kimlik doğrulama başarısız' });
    }

    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Giriş sırasında bir hata oluştu' });
  }
});

module.exports = router;