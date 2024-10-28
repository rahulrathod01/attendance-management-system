const nodemailer = require('nodemailer');

exports.sendEmail = async (to, link, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject: 'Client Login Details',
        text: `Login here: ${link} with password: ${password}`,
        //html: `<p>Login here: <a href="${link}">${link}</a></p><p>with password: ${password}</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
