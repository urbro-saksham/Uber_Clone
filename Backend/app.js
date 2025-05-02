const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require('./DB/db');

connectDB();

const express = require('express');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
})

module.exports = app;