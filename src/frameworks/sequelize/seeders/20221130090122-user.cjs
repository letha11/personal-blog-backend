"use strict";
// import bcrypt from 'bcrypt';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        username: "johnDoe",
        // password: import('../../services/authService')().encryptPassword("testing").then(val => val),
        password: bcrypt.hashSync("testing", 10),
        email: "dummy_email@gmail.com",
        role: 'admin',
        createdAt: Sequelize.fn("NOW"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
