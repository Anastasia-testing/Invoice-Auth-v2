// Requiring necessary npm packages
const express = require("express");
// Requiring passport as we've configured it

const route = require("./routes/html-routes.js");
const api = require("./routes/api-routes.js");
const customer = require("./routes/customer-routes.js");
const item = require("./routes/item-routes.js");
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// ROUTES
app.use(api);
app.use(route);
app.use(customer);
app.use(item);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
