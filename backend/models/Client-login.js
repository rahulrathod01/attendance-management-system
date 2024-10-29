
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const Client = mongoose.model('Client-Login', clientSchema);
module.exports = Client;
