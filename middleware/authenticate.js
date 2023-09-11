// const jwt = require('jsonwebtoken');
// const secretKey = 'cokgizlianahtar2';

// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ error: 'Kimlik doğrulama başarısız. Token eksik.' });
//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.status(403).json({ error: 'Kimlik doğrulama başarısız. Token geçersiz.' });
//     req.user = user;
//     next();
//   });
// };

const jwt = require("jsonwebtoken");

function authenticate (req, res, next) {
  console.log('aasd',req)
  try {
      const token = req.header("Authorization");
      if (!token) return res.status(403).send("erisim izni reddedildi");

      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      next();
  } catch (error) {
      res.status(400).send("gecersiz token");
  }
};


module.exports = authenticate;


