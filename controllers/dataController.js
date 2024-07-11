// controllers/dataController.js

const Data = require("../models/dataModel");

exports.createData = async (req, res) => {
  try {
    const { name, price, category, status, properties } = req.body;
    const photo = `/uploads/${req.file.filename}`;

    const parseProperties = JSON.parse(properties);

    const newData = new Data({
      name,
      price,
      category,
      status,
      photo,
      properties: parseProperties,
    });

    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ message: "Failed to create data." });
  }
};

exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
