const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const moment = require('moment');
require('dotenv/config');

module.exports.sendNewOrderNotif = async function sendNewOrderNotif(order) {
  // create reusable transporter object using the default SMTP transport

  const transporter = nodemailer.createTransport({
    host: 'miftahdev.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAILER_LOGIN, // generated ethereal user
      pass: process.env.SMTP_MAILER_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  transporter.use('compile', hbs({
    viewEngine: {
      partialsDir: './views/partials',
      layoutsDir: './views/layouts',
      handlebars: allowInsecurePrototypeAccess(Handlebars) // fix property issue
    },
    viewPath: './',
  }));

  // send mail with defined transport object
  await transporter.sendMail({
    from: '<test@miftahdev.com>', // sender address
    to: 'dev.miftah@gmail.com', // list of receivers
    subject: 'Nouvelle Commande !', // Subject line
    text: 'Hello world?', // plain text body
    template: 'index',
    context: {
      order,
      date: moment(order.date).format('YYYY-MM-DD HH:mm')
    },
  });
};
