const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB // if database does not exisit, it will automatically create it db
mongoose.connect('mongodb://127.0.0.1:27017/apiSocial');

module.exports = mongoose.connection;