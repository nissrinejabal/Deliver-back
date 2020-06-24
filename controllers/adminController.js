const Order = require('../models/Order');
const User = require('../models/User');

module.exports.update = (req, res) => {
  const { _id, state } = req.body;

  Order.findByIdAndUpdate({ _id }, { $set: { state } }, (err, order) => {
    if (order) res.status(201).json({ updated: true });
    else res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
  });
};

module.exports.index = (req, res) => {
  const data = { usersCount: 0, ordersCount: 0, orders: [] };
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  User.countDocuments({}, (err, count) => {
    data.usersCount = count;
    Order.countDocuments({}, (err2, count2) => {
      data.ordersCount = count2;
      Order.find({ date: { $gte: startOfToday } }, null, { sort: { date: -1 } }, (err3, items) => {
        data.orders = items;
        res.status(201).json(data);
      });
    });
  });
};

module.exports.users = (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(400).json(err);
    else res.status(201).json(users);
  });
};

module.exports.orders = (req, res) => {
  Order.find({}, null, { sort: { date: -1 } }, (err, Orders) => {
    if (err) res.status(400).json(err);
    else res.status(201).json(Orders);
  });
};

module.exports.profile = (req, res) => {
  const { id } = req.params;

  User.findById(id).populate('orders').exec((err, document) => {
    if (err) res.status(500).json({ message: { msgBody: err, msgError: true } });
    else {
      res.status(200).json({ user: document, orders: document.orders, authenticated: true });
    }
  });
};

module.exports.order = (req, res) => {
  const { id } = req.params;

  Order.findById(id).exec((err, document) => {
    if (err) res.status(500).json({ message: { msgBody: err, msgError: true } });
    else {
      res.status(200).json({ order: document, orders: document.orders, authenticated: true });
    }
  });
};
