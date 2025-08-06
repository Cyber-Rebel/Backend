const mongoose = require('mongoose');

function Database (){
mongoose.connect(process.env.Moongodb_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});}

module.exports = Database;