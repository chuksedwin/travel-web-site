//Contactus route created by Stanley
var express = require("express");
var router = express.Router();
//const data = require('../models/mysql_data'); // MySQL (alternative database)
//const data = require('../models/mongo_data'); //MongoDB (alternative database)
const data = require("../models/mongoose_data"); //Mongoose
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({ //nodemailer for sending email to travel expert
  service: "gmail",
  auth: {
    user: "eexpress897@gmail.com",
    pass: "xixjkelugkfopkzf",
  },
});
/* GET contactus page */
router.get("/", function (req, res, next) {
  // Getting the agency information
  data.getContactData(null, (error, agencies) => {
    if (error) return res.status(500).send("Error " + error);
    // Get agents information
    data.getContactData(1, (error, agents) => {
      res.render("contactus", { agencies: agencies, agents: agents });
    });
  });
});

// Gets the agents
router.get("/:agencyid", function (req, res, next) {
  data.getContactData(req.params.agencyid, (err, agents) => {
    if (err) return res.status(500).send("Error " + error);
    res.json(agents);
  });
});

// Posts the feedback details to travelexperts set up email
router.post("/", function (req, res, next) {
  console.log(req.body);
  var mailOptions = {
    from: "eexpress897@gmail.com",
    to: "eexpress897@gmail.com",
    subject: "ContactUs email: " + req.body.email,
    text: `full name: ${req.body.firstName} ${req.body.lastName}
email: ${req.body.email}
content:
${req.body.message}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.render("errorpage", {
        errormessage: error,
      });
    } else {
      res.send(
        "<h2 style='margin:50px;text-align: center;'>" +
          "Thank You for giving us a feedback</h2>" +
          "<script> setTimeout(()=>window.location='/travel', 2000)</script>"
      );
    }
  });
});


module.exports = router;
