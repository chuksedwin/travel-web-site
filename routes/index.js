//Index route created by Abdullah
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.session);
  res.render("travel", { loginmsg: req.flash("error") });
});

module.exports = router;
