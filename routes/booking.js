//booking route created by Akachi
var express = require("express");
var router = express.Router();
const data = require("../models/mongoose_data");

// Creates a new booking
router.post("/bookings", (req, res, next) => {
  //console.log(JSON.stringify(req.body));
  data.createBooking(req.body, (err, message) => {
    if (err) return res.status(500).send("Error " + err);
    res.send(
      "<h2 style='margin:50px;text-align: center;'>" +
        "Thank You for Booking with us</h2>" +
        "<script> setTimeout(()=>window.location='/travel', 3000)</script>"
        
    );    
  });
});

// Redirects page
router.post("/redirect", (req, res, next) => {
  data.createBooking(req.body, (err, message) => {
    if (err) return res.status(500).send("Error " + err);
    res.redirect("/bookings" + req.body);
  });
});

module.exports = router;
