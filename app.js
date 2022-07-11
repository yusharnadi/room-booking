const express = require('express');
const authMiddleware = require('./authMiddleware');
const jwt = require('jsonwebtoken');

// const bodyParser = require('body-parser');
const router = require('./router');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use('/api/v1', router);
app.get('/token', (req, res) => {
  const payload = {
    name: 'operator',
    role: 'operator',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ token });
});

app.listen(port, (err) => {
  console.log(`Server is listening on port ${port}`);
});
