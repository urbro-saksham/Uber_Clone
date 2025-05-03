const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require('./DB/db');
const userRoutes = require('./Routes/user.route')

connectDB();

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
})

module.exports = app;