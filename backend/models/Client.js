const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    companyName: { type: String, required: true }, 
    ownerName: { type: String, required: true },   
    email: { type: String, required: true, unique: true }, 
    registrationNumber: { type: String, required: true }, 
    gstNumber: { type: String, required: true },            
    loginLink: { type: String } 
});

ClientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
    next();
  });

module.exports = mongoose.model('Client', ClientSchema);
