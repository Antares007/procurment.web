module.exports = function autorization(){
  var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , route = require('express').Router()
    , config = require('./config.js');

  var users = { acho: '123' };
  passport.use(new LocalStrategy(
    function(username, password, done) {
      if(users[username]){
        if(users[username] === password) {
          done(null, {name: username});
        } else {
          done(null, false, { message: 'Incorrect password.' });
        }
      } else {
        done(null, false, { message: 'Incorrect username.' });
      }
    }
  ));
  passport.use(new FacebookStrategy({
      clientID: config.auth.fb.clientID,
      clientSecret: config.auth.fb.clientSecret,
      callbackURL: config.auth.fb.callbackHost + '/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, {name: profile.id});
    }
  ));
  passport.use(new GoogleStrategy({
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: config.auth.google.callbackHost + '/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, {name: profile.id});
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.name);
  });
  passport.deserializeUser(function(id, done) {
    done(null, { name: id});
  });

  route.use(passport.initialize());
  route.use(passport.session());

  route.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
  route.get('/auth/facebook', passport.authenticate('facebook'));
  route.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
  route.get('/auth/google', passport.authenticate('google',  {scope: ['https://www.googleapis.com/auth/plus.login']}));
  route.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
  route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  return route;

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }
}
