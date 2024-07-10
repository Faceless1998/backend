// models/dataModel.js

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Data', dataSchema);
