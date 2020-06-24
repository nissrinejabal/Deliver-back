const express = require('express');
const passport = require('passport');
const adminController = require('../../controllers/adminController');
require('../../config/passport');

const adminRouter = express.Router();

adminRouter.get('/', passport.authenticate('jwt', { session: false }), adminController.index);

adminRouter.put('/order', adminController.update);

adminRouter.get('/users', adminController.users);

adminRouter.get('/orders', adminController.orders);

adminRouter.get('/profile/:id', adminController.profile);

adminRouter.get('/orders/:id', adminController.order);

module.exports = adminRouter;
