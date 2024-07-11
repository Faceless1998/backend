// models/dataModel.js

const mongoose = require('mongoose');

const propertyScheme = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
})

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  photo: { type: String, required: true },
  properties: [propertyScheme],
},{collection: 'fruits'});

module.exports = mongoose.model('Data', dataSchema);