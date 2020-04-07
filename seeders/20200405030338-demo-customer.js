"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Customers", [
      {
        first_name: "Johnny",
        last_name: "Walker",
        email: "JohnnyWalker@example.com",
        phone_number: 6031112222,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ,
      {
        first_name: "Jack",
        last_name: "Daniels",
        email: "JackDaniels@example.com",
        phone_number: 6031112223,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: "Captain",
        last_name: "Morgan",
        email: "CaptainMorgan@example.com",
        phone_number: 6031112224,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: "Crown",
        last_name: "Royal",
        email: "CrownRoyal@example.com",
        phone_number: 6031112225,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: "Jim",
        last_name: "Bean",
        email: "JimBeanl@example.com",
        phone_number: 6031112226,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Customers", null, {});
  }
};
