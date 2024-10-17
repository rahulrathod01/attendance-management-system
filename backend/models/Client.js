const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ClientSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    enterOwnerName: {type: String, required: true},
    emailAddress: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    companyregistrationNumber: { type: String, required: true },
    enterRegNumber: { type: String, required: true },
    gstNumber: { type: String },
    entergstNumber :{ type: String },
    field1: { type: String },
    field2: { type: String },
    field3: { type: String },
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
