'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      CL_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CL_FirstName: {
        type: Sequelize.STRING,
      },
      CL_LastName: {
        type: Sequelize.STRING,
      },
      CL_DateOfBirth: {
        type: Sequelize.DATE,
      },
      CL_Phone: {
        type: Sequelize.STRING,
      },
      CL_Email: {
        type: Sequelize.STRING,
      },
      CL_Address: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  },
};
