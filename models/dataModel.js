const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  photo: { type: String, required: true },
  properties: [propertySchema],
}, { collection: 'fruits' }); // Optional: Specify collection name if different from default

module.exports = mongoose.model('Data', dataSchema);
