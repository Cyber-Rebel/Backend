const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // Ensures that no two users can have the same username ( error showing :- throws a MongoDB duplicate key error if violated)
    required: true // Username is mandatory to identify the user (cannot be null or undefined)
  },
  password: {
    type: String,
    // required: true -> Not always required because:
    // 1️⃣ For normal signup (email/password), it will be stored.
    // 2️⃣ For OAuth logins (e.g., Google Auth), password may not be needed.
  }
});

// Create a model for the User collection
// NOTE: Use mongoose.model (lowercase 'm'), not new mongoose.Model
const UserModels = mongoose.model('user', userSchema); 

// Export the User model to be used in other parts of the project
module.exports = UserModels;
