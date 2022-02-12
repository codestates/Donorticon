const nodemailer = require('nodemailer');
require("dotenv").config();

module.exports = {
  get: async (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
      user: `${process.env.MAIL_ID}`,
      pass: `${process.env.MAIL_PASSWORD}`
      }
    });

    const message = {
      from: "swim1720@naver.com",
      to: `${req.headers.email}`,
      subject: "This email has been sent from Nodejs",
      text: "Hello SMTP Email"
    };

    const mailer = await transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

  }
}