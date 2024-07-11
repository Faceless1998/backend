const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({ error: 'Internal Server Error' }); // Send a generic error response
});


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("Error: MongoDB connection string is not defined in the environment variables.");
  process.exit(1); // Exit the application with a failure code
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define Mongoose Schema and Model (Example)
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  status: String,
  photoUrl: String, // Example field for storing photo URL
  properties: [{ name: String, value: String }],
});

const DataModel = mongoose.model('Data', dataSchema);

// Routes
app.post('/api/data', upload.single('photo'), async (req, res) => {
  try {
    const { name, price, category, status, properties } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : '';

    // Create new data instance
    const newData = new DataModel({
      name,
      price,
      category,
      status,
      photoUrl,
      properties,
    });

    // Save to MongoDB
    await newData.save();

    res.status(200).json({ message: 'Data saved successfully', data: newData });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
