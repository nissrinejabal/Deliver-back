const express = require('express');
const passport = require('passport');
const orderController = require('../../controllers/orderController');
require('../../config/passport');

const orderRouter = express.Router();

orderRouter.get('/', passport.authenticate('jwt', { session: false }), orderController.index);

orderRouter.post('/', passport.authenticate('jwt', { session: false }), orderController.store);

module.exports = orderRouter;
