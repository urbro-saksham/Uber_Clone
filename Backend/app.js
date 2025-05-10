const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./DB/db');
const userRoutes = require('./Routes/user.route');
const captainRoutes = require('./Routes/captain.routes');
const cookieparser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();

// Apply CORS before routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // only needed if you're sending cookies
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

module.exports = app;
