// Configures app for Authentication using Passport.js
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var flash = require("connect-flash");
const data = require("./models/mongoose_data");

module.exports = (app) => {
  // Allows us to assign every user of the app a unique session, which allows us to store user state (are they logged in?)
  // secret is used to sign the session ID cookie – should be a random unique string
  app.use(
    session({
      secret: "myTravelWebsite secret",
      resave: false,
      saveUninitialized: true,
    })
  );
  // To show login messages while redirecting. e.g. 'Inccorect Username'
  app.use(flash());

  // The login function
  passport.use(
    new LocalStrategy((username, password, done) => {
      //console.log(username, password)
      return data.verifyLogin(username, password, done);
    })
  );

  // User to store user data between requests
  // Allows the user to stay logged in for the same session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    data.getUser(id, function (err, user) {
      done(err, user);
    });
  });
  // initialize Passport
  app.use(passport.initialize());
  // initialize session
  app.use(passport.session());
  // Saving user object during request processing
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

  app.post(
    // User Login API
    "/log-in",
    (req, res, next) => {
      passport.authenticate("local", function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("/register");
        }
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          var redirectUrl = req.body.packageId ? "/bookings" : "/travel";

          req.session.packageId = req.body.packageId;

          return res.redirect(redirectUrl);
        });
      })(req, res, next);
    }
  );
  app.get("/log-out", (req, res) => {
    // User logout API
    req.logout();
    res.redirect("/travel");
  });
};
