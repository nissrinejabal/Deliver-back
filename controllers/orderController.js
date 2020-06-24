const Order = require('../models/Order');
const User = require('../models/User');
const Mailer = require('../mailer/index');

module.exports.store = (req, res) => {
  const order = new Order(req.body);
  order.save((err) => {
    if (err) res.status(500).json({ message: { msgBody: err, msgError: true } });
    else {
      req.user.orders.push(order);
      req.user.save((err2) => {
        if (err2) res.status(500).json({ message: { msgBody: err2, msgError: true } });
        else {
          Mailer.sendNewOrderNotif(order);
          res.status(201).json({ message: { msgBody: 'Order successfully submited', msgError: false } });
        }
      });
    }
  });
};

module.exports.index = (req, res) => {
  const { _id } = req.user;
  User.findById({ _id }).populate('orders').exec((err, document) => {
    if (err) res.status(500).json({ message: { msgBody: 'Error has occured *', msgError: true } });
    else {
      res.status(200).json({ user: req.user, orders: document.orders, authenticated: true });
    }
  });
};
