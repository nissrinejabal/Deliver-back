const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id, email, name) => {
  const options = { expiresIn: '1day' };
  return JWT.sign({
    iss: 'DeliverMe',
    sub: id,
    email,
    name
  }, 'S3cr3t', options);
};

module.exports.register = (req, res) => {
  const {
    email,
    password,
    name,
    phone,
    adresse
  } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) res.status(500).json({ message: err.message, msgError: true });

    if (user) res.status(400).json({ message: 'Vous avez déjà créé un compte avec cette adresse email. Merci de saisir une adresse différente.', msgError: true });
    else {
      // eslint-disable-next-line object-curly-newline
      const newUser = new User({ email, password, name, phone, adresse });
      newUser.save((err2) => {
        if (err2) res.status(500).json({ message: err2.message, msgError: true });
        else {
          res.status(201).json({ message: 'Account created', msgError: false });
        }
      });
    }
  });
};

module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    const {
      _id, email, name, phone, adresse
    } = req.user;
    const userInfo = {
      _id, email, name, phone, adresse
    };
    const token = signToken(_id, email, name);
    res.cookie('access_token', token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: userInfo });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('access_token');
  res.json({ user: { email: '', name: '' }, success: true });
};
