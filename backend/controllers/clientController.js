const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginClient = async (req, res) => {
    const { email, password } = req.body;
    const client = await Client.findOne({ email });
  
    if (!client) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
  
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
};