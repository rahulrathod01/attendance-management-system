const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee', 'manager'], default: 'employee' },
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
  // middleName: { type: String },
  // email: { type: String, required: true, unique: true },
  // gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  // dob: { type: Date, required: true },
  // designation: { type: String, required: true },
  // maritalStatus: { type: String, enum: ['single', 'married', 'divorced', 'widowed'], required: true },
  // department: { type: String, required: true },
  // manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, {
  timestamps: true
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
