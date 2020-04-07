// Requiring our models and passport as we've configured it
const db = require("../models");
const { Router } = require("express");

const item = Router();

//get all items by name
item.get("/items/", function(req, res) {
  db.item.findAll({}).then(function(dbitem) {
    res.json(dbitem);
  });
});

//get a specific item by name
item.get("/items/:item_name", function(req, res) {
  db.item
    .findAll({
      where: {
        item_name: req.params.itemName,
        price: req.params.price
      }
    })
    .then(function(dbitem) {
      res.json(dbitem);
    });
});

//get a specific item by id
item.get("/items/:id", function(req, res) {
  db.item
    .findAll({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbitem) {
      res.json(dbitem);
    });
});

// POST route for saving a new item
item.post("/item/addNew", function(req, res) {
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

// DELETE route for deleting item
item.delete("/item/posts/:id", function(req, res) {
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

module.exports = item;
