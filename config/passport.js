const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};

passport.use(new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'S3cr3t'
}, (payload, done) => {
  User.findById({ _id: payload.sub }, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(err, user);
    return done(err, false);
  });
}));

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(err, false);
    user.comparePassword(password, done);
  });
}));
