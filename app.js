const express = require('express');
const authMiddleware = require('./authMiddleware');
const jwt = require('jsonwebtoken');
const router = require('./router');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/api/v1', router);

app.listen(port, (err) => {
    console.log(`Server is listening on port ${port}`);
});
