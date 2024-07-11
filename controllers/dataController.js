const Data = require("../models/dataModel");

// Create new data entry
exports.createData = async (req, res) => {
  try {
    const { name, price, category, status, properties } = req.body;
    const photo = `/uploads/${req.file.filename}`; // Corrected syntax error

    const parsedProperties = JSON.parse(properties);

    const newData = new Data({
      name,
      price,
      category,
      status,
      photo,
      properties: parsedProperties,
    });

    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error creating data:", error); // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error' }); // Use status 500 for internal server errors
  }
};

// Get all data entries
exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error); // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error' }); // Use status 500 for internal server errors
  }
};
