'use strict';

const { faker } = require('@faker-js/faker');

const posts = [];

for (let i = 0; i < 3; i++) {
	posts.push({
		authorId: 1,
		title: faker.word.adjective(),
		body: faker.lorem.lines(2),
	});
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

		await queryInterface.bulkInsert("Posts", posts);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
