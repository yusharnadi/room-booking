const express = require('express');
// const bodyParser = require('body-parser');
const Routes = require('./route');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use('/v1', Routes);

app.listen(port, (err) => {
  console.log(`Server is listening on port ${port}`);
});
