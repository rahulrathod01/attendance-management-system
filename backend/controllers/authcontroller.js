const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Client = require('../models/Client.js');
const { sendEmail } = require('../units/emailService.js');
const crypto = require('crypto');


exports.companyLogin = async (req, res) => {
    const { email, password } = req.body;
    const companyEmail = process.env.EMAIL;
    const companyPassword = process.env.PASSWORD;

    try {
        if (email === companyEmail && password === companyPassword) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1000d' });
            return res.json({ token });
        }
        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error('Error during company login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.registerClient = async (req, res) => {
    console.log('Received body:', req.body);
    const {
        companyName,
        ownerName,
        email,
        registrationNumber,
        gstNumber,
        field1,
        field2,
        field3,

    } = req.body;

    clientLink = `${req.protocol}://${req.get('host')}/client-login/${companyName}`;

    // clientUsername = `${ownerName}.${companyName}`;

    const clientPassword = crypto.randomBytes(8).toString('hex');

    try {

        const hashedPassword = await bcrypt.hash(clientPassword, 10);
        const client = new Client({
            companyName : companyName,
            ownerName : ownerName,
            email : email,
            registrationNumber: registrationNumber,
            gstNumber: gstNumber,
            field1: field1,
            field2: field2,
            field3: field3,
            clientURL: clientLink,
            // username: clientUsername,
            password: hashedPassword,
        });
        await client.save();

        // await sendEmail(email, clientLink, clientPassword);
        return res.json({
            message: 'Client registered successfully and link generated',
            generatedLink: clientLink
        });
    } catch (error) {
        console.error('Error during client registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

