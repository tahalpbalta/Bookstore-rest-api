const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const PORT = 3000;

const users = [];

const secretKey = 'girissifresi';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Kimlik doğrulama başarısız. Token eksik.' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Kimlik doğrulama başarısız. Token geçersiz.' });

    req.user = user;
    next();
  });
}

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu' });
  }
});

app.get('/koruma', authenticateToken, (req, res) => {
  res.json({ message: 'giris yapilmistir.' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});