// controllers/dataController.js

const Data = require('../models/dataModel');

exports.createData = async (req, res) => {
  try {
    const { name, value } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const newData = new Data({ name, value, imageUrl });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
