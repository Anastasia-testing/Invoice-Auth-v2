"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Items", [
      {
        item_name: "Hendricks Gin",
        cost: 58,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: "Bacardi Vodka",
        cost: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: "Jameson Irish Whiskey",
        cost: 34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: "Bulleit Bourban",
        cost: 56,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_name: "Campari",
        cost: 37,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Items", null, {});
  }
};
