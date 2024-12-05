const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ClientSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true },
    gstNumber: { type: String, default: null },
    field1: { type: String, default: null },
    clientURL: { type: String, required: true, unique: true },
    password: { type: String, required: true, immutable: true },
    createdAt: { type: Date, default: Date.now },
});

ClientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    // Optional (just in case): Validate the password is not already hashed
    // const isAlreadyHashed = /^\$2[ayb]\$.{56}$/.test(this.password);
    // if (isAlreadyHashed) {
    //     console.log("Password already hashed. Skipping rehash.");
    //     return next();
    // }
    // Otherwise, hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Client = mongoose.model("clients", ClientSchema);

module.exports = Client;
