const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Client = require("../models/client-register.js");
const { sendEmail } = require("../units/emailService.js");
const crypto = require("crypto");
const user = require("../models/user.js");

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
    console.error("Error during company login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.registerClient = async (req, res) => {
    const { companyName, ownerName, email, registrationNumber, gstNumber, field1 } = req.body;

    try {
        const clientPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(clientPassword, 10);

        const clientLoginLink = `${req.protocol}://${req.get('host')}/client-login`;

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
        });
    } catch (error) {
        console.error('Error during client registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.loginClient = async (req, res) => {
    const { email, password } = req.body;
    try {
      //console.log('Received login request:', email, password); 
      const client = await Client.findOne({ email });
  
      if (!client) {
        console.log('Client not found:', email);
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      console.log('Client found:', client);
  
      const isPasswordMatch = await bcrypt.compare(password, client.password);
  
      if (!isPasswordMatch) {
        console.log('Password does not match');
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      console.log('Password match successful');
  
      const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: "1000d" });
      console.log('Token generated:', token);

      res.json({ token, id: client._id });
      
    } catch (error) {
      console.error("Error during client login:", error);
      res.status(500).send({ message: "Internal server error" });
    }
};
  
  
