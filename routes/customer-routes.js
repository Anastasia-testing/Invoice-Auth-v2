// Requiring our models and passport as we've configured it
const db = require("../models");
const { Router } = require("express");

const customer = Router();
//get a specific customer
customer.get("/customers/:first_name/:last_name", function(req, res) {
  db.Customer.findAll({
    where: {
      first_name: req.params.first_name,
      last_name: req.params.last_name
    }
  }).then(function(dbCustomer) {
    res.json(dbCustomer);
  });
});

//get a specific customer by name
customer.get("/customers/:name", function(req, res) {
  db.Customer.findAll({
    where: {
      name: req.params.first_name + req.params.last_name
    }
  }).then(function(dbCustomer) {
    res.json(dbCustomer);
  });
});

//get a specific customer by id
customer.get("/customers/:id", function(req, res) {
  db.Customer.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(dbCustomer) {
    res.json(dbCustomer);
  });
});

// POST route for saving a new customer
customer.post("/customer/addNew", function(req, res) {
  console.log(req.body);
  db.Post.create({
    first_name: req.body.CuFirstName,
    last_name: req.body.CuLastName,
    email: req.body.CuEmail,
    phone_number: req.body.CuPhone
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

// DELETE route for deleting posts
customer.delete("/customer/posts/:id", function(req, res) {
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

module.exports = customer;
