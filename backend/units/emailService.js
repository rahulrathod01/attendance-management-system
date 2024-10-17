const nodemailer = require('nodemailer');


exports.sendEmail = (to, link, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Password,
        },
    });

    const mailOptions = {
        from: process.env.Email,
        to, 
        subject: 'Client Login Details',
        text: `Login here: ${link} with password: ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};