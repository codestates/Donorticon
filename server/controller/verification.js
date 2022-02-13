const nodemailer = require('nodemailer');
const crypto = require('crypto');
require("dotenv").config();
const hbs = require('nodemailer-express-handlebars')
const path = require('path');


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
    
    // point to the template folder
    const handlebarOptions = {
      viewEngine: {
          partialsDir: path.resolve('./controller/'),
          defaultLayout: false,
      },
      viewPath: path.resolve('./controller/'),
    };
    transporter.use('compile', hbs(handlebarOptions))

    const code = crypto.randomBytes(127).toString('hex');

    const message = {
      from: "swim1720@naver.com",
      to: `${req.headers.email}`,
      subject: "Donorticon: Please verify your email",
      template: "email", 
      context: {
        src: `${process.env.BUCKET}/aintgottime.jpg`,
        redirection: `${process.env.CLIENT_URL}/type=1/id=1/code=${code}`
      } 
    };

    const mailer = await transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  },

  put: async (req, res) => {
    res.status(200).json({message: 'ok'});
  }
}