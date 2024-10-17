const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT =process.env.PORT || 5000;


//connect to the database
connectDB();


//Middleware
app.use(cors());
app.use(express.json());


//ROutes
app.use('/api/auth', authRoutes);


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
