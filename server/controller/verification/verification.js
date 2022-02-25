const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const { giver, helper } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const id = parseInt(req.headers.id);
    const email = req.headers.email;
    const type = parseInt(req.headers.type);
    const transporter = nodemailer.createTransport({
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: `${process.env.MAIL_ID}`,
        pass: `${process.env.MAIL_PASSWORD}`,
      },
    });

    // point to the template folder
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve('./controller/verification'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./controller/verification'),
    };
    transporter.use('compile', hbs(handlebarOptions));

    const code = crypto.randomBytes(127).toString('hex');
    const message = {
      from: 'swim1720@naver.com',
      to: email,
      subject: 'Donorticon: Please verify your email',
      template: 'email',
      context: {
        src: `${process.env.BUCKET}/aintgottime.jpg`,
        redirection: `${process.env.CLIENT_URL}/verifyRedir/type=${type}/id=${id}/code=${code}`,
      },
    };

    if (req.headers.type === '1') {
      await giver.update({ verify_hash: code }, { where: { id } });
      await transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
          res.status(200).json({ Message: 'Success', id, email, type });
        }
      });
    } else if (req.headers.type === '2') {
      await helper.update({ verify_hash: code }, { where: { id } });
      await transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
          res.status(200).json({ Message: 'Success', id, email, type });
        }
      });
    }
  },

  put: async (req, res) => {
    const type = req.body.headers.type;
    const id = req.body.headers.id;
    const code = req.body.headers.code;
    if (type === '1') {
      let userInfo = await giver.findOne({
        where: { id: id },
      });
      if (userInfo.verify_hash === code) {
        await giver.update({ verification: true }, { where: { id: id } });
        res.status(200).json({ message: 'Verified', verification: true });
      } else {
        res
          .status(400)
          .json({ message: 'Invalid Request', verification: false });
      }
    } else if (type === '2') {
      let userInfo = await helper.findOne({
        where: { id: id },
      });
      if (userInfo.verify_hash === code) {
        await helper.update({ verification: true }, { where: { id: id } });
        res.status(200).json({ message: 'Verified', verification: true });
      } else {
        res
          .status(400)
          .json({ message: 'Invalid Request', verification: false });
      }
    }
  },
};
