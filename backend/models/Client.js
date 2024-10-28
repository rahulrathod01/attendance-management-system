const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ClientSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true },
    gstNumber: { type: String },
    field1: { type: String },
    clientURL: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

ClientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

module.exports = mongoose.model("Client", ClientSchema);
