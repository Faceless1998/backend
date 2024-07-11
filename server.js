const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // adjust the destination as needed
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// MongoDB Schema and Model setup
const dataSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  status: String,
  photo: String, // Assuming photo is stored as a string (file path or URL)
  properties: [{ key: String, value: String }]
});

const Data = mongoose.model('Data', dataSchema);

// POST endpoint for creating new data
app.post('/api/data', upload.single('photo'), async (req, res) => {
  try {
    const { name, price, category, status, properties } = req.body;
    const photo = req.file ? req.file.path : ''; // Assuming Multer is used for file upload

    const newData = new Data({
      name,
      price,
      category,
      status,
      photo,
      properties: JSON.parse(properties) // Assuming properties are sent as a JSON string
    });

    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.error('Error creating data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
