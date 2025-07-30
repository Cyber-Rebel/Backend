const mongoose = require('mongoose');

function Database (){
mongoose.connect("mongodb://localhost:27017/Authd")
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});}

module.exports = Database;