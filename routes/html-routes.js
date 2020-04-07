// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const { Router } = require("express");
const route = Router();
// Requiring our custom middleware for checking if a user is logged in

route.get("/", function(req, res) {
  // If the user already has an account send them to the members page
  /*if (req.user) {
    res.redirect("/something");
  }*/
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

route.get("/login", function(req, res) {
  // If the user already has an account send them to the members page
  /* if (req.user) {
    res.redirect("/members");
  }*/
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
route.get("/dashboard", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});
module.exports = route;
