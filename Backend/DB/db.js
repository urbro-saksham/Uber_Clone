const mongoose = require('mongoose');

function connectDB() {
mongoose.connect(process.env.CONNECTION_STRING, )
.then(() => console.log("MongoDB CONNECTED!"))
.catch((err) => console.log("MONGODB ERROR!", err))
}

module.exports = connectDB;