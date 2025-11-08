const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');

// Enable CORS for all routes
app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true,
  }
));
// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() })

// Middleware to parse JSON bodies
app.use(express.json());

// File handling routes
app.post('/', upload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file); // Access the uploaded file via req.file
    res.send('Welcome to the Backend!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


