const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Client = require('../models/client.js');
const { sendEmail } = require("../units/emailService.js");
const crypto = require("crypto");

exports.companyLogin = async (req, res) => {
  const { email, password } = req.body;
  const companyEmail = process.env.EMAIL;
  const companyPassword = process.env.PASSWORD;
  
  try {
    if (email === companyEmail && password === companyPassword) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1000d",
      });
      return res.json({ token });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.registerClient = async (req, res) => {
  const { companyName, ownerName, email, registrationNumber, gstNumber, field1 } = req.body;

  try {
    // Generate a random plaintext password and hash it
    const clientPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(clientPassword, 10);

    const clientLoginLink = `${req.protocol}://${req.get('host')}/client-login`;

    // Create and save the client
    const client = new Client({
      companyName,
      ownerName,
      email,
      registrationNumber,
      gstNumber,
      field1,
      password: hashedPassword,
      clientURL: clientLoginLink,
    });

    await client.save();

    // Email preparation
    const emailSubject = 'Your Client Login Details';
    const emailBody = `
      Dear ${ownerName},

      Thank you for registering with us. Below are your login details:

      Login Link: ${clientLoginLink}
      Email: ${email}
      Password: ${clientPassword}

      Please log in using the above credentials.

      Best regards,
    `;
    await sendEmail(email, emailSubject, emailBody);

    return res.status(201).json({
      message: 'Client registered successfully. Login link sent to the registered email.',
      generatedLink: clientLoginLink,
      generatedPassword: clientPassword, // Remove this in production
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the stored hash
    const isPasswordMatch = await bcrypt.compare(password, client.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token on successful login
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: "1000d" });

    return res.json({
      message: "Login successful",
      token,
      redirectURL: "/dashboard",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
