const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');
// const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
app.use(routes);
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});





  

