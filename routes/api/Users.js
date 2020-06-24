const express = require('express');
const passport = require('passport');
const authController = require('../../controllers/authController');
require('../../config/passport');

const userRouter = express.Router();

userRouter.post('/register', authController.register);

userRouter.post('/login', passport.authenticate('local', { session: false }), authController.login);

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), authController.logout);

userRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;
  res.status(200).json({ isAuthenticated: true, user });
});

module.exports = userRouter;
