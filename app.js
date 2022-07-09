const express = require('express');
// const bodyParser = require('body-parser');
const router = require('./router');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use('/api/v1', router);

app.listen(port, (err) => {
  console.log(`Server is listening on port ${port}`);
});
