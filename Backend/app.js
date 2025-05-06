const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require('./DB/db');
const userRoutes = require('./Routes/user.route');
const captainRoutes = require('./Routes/captain.routes');
const cookieparser = require('cookie-parser');

connectDB();

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieparser());
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
})

module.exports = app;