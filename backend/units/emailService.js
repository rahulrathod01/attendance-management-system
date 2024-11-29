const { text } = require("body-parser");
const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject,link, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject,
      text: `Login here: ${link}`,
      
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
