var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Booking = require("./models/mongoose_models/Booking_model");
var Package = require("./models/mongoose_models/Package_model");

var indexRouter = require("./routes/index");
var contactusRouter = require("./routes/contactus");
var PackageRouter = require("./models/mongoose_data");
var usersRouter = require("./routes/users");
var bookingsRouter = require("./models/mongoose_data");
var privateRouter = require("./routes/private"); 
const configPassport = require("./configure_passport");
const mongoose = require("./models/mongoose_connect");
const { query } = require("express");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html", "jpg"],
  })
);

// **************  Authentication
configPassport(app);
// ************* End Authentication *****

// Get packages from database
app.get("/packages", (request, response, next) => {
  PackageRouter.getPackages((err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let images = [
      "https://images.pexels.com/photos/2346015/pexels-photo-2346015.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://i.pinimg.com/originals/26/2a/a2/262aa2ccd86c03ca1cf3ecc26faf3fcf.jpg",
      "https://images.rove.me/w_1920,q_85/esg9hjkjxpjucnxv3jqd/banff-glacier-skywalk.jpg",
      "https://www.banfflakelouise.com/sites/default/files/styles/m_960_natural/public/winter_banff_upper_hot_springs_2016_noel_hendrickson_horizontal_9_0.jpg?itok=OkGZZ0uY",
    ];
    response.render("packages", {
      packages: data,
      images: images,
      isLoggedIn: request.isAuthenticated(),
    });
  });
});

//shows the register page
app.get("/register", (request, response, next) => {
  if (request.user) {
    response.redirect("/travel");
  } else {
    response.render("register");
  }
});

//shows the bookings page
app.get("/bookings", (request, response, next) => {
  let id = request.session.packageId
    ? request.session.packageId
    : request.query.packageId;
  request.session.packageId = id;
  if (id) {
    PackageRouter.getPackageById(id, (err, data) => {
      if (request.user && !err) {
        console.log(request.user);
        response.render("bookings", { data: data, user: request.user });
        return;
      }
      response.status(500).send("Error " + err);
    });
  }
});

// Posts new bookings and redirects page
app.post("/bookings", (request, response, next) => {
  let id = request.session.packageId
    ? request.session.packageId
    : request.query.packageId;
  delete request.session.packageId;

  const booking = new Booking({
    UserId: request.user._id,
    PackageId: id,
  }).save((err, data) => {
    if (err) {
      response.render("errorpage", { errormessage: err });
      return;
    }
    //redirect and thank you page
    response.send(
      "<h2 style='margin:50px;text-align: center;'>" +
        "Thank You for Booking</h2>" +
        "<script> setTimeout(()=>window.location='/travel', 2000)</script>"
    );
  });
});
// Forgot password page
app.get("/forgotpass", (request, response, next) => {
  response.render("forgotpass");
});



app.get("/contacts", (request, response, next) => {
  console.log("here: " + request.query.userId);

  Contact.findById(request.query.userId, (err, contact) => {
    if (err) {
      console.log(err);
      return;
    }

    response.json(contact);
  });
});



// Travel page
app.get("/travel", (request, response, next) => {
  response.render("travel");
});

// search request
app.get("/search", (request, response, next) => {
  var key = request.query.key;
  Package.find({ PkgName: new RegExp(key) }, (err, data) => {
    if (err) {
      console.log(err);
    }
    //response.render("search" , {packages:data});
    response.json(data);
  });
});

app.use("/", indexRouter);
app.use("/contactus", contactusRouter);
app.use("/users", usersRouter);
app.use("/private", privateRouter); 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("errorpage");
});

module.exports = app;
