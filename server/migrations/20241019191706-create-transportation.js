'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Transportation', {
      TRP_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TRP_Type: {
        type: Sequelize.STRING,
      },
      TRP_CarrierName: {
        type: Sequelize.STRING,
      },
      TRP_Cost: {
        type: Sequelize.DECIMAL,
      },
      TRP_Phone: {
        type: Sequelize.STRING,
      },
      TRP_Email: {
        type: Sequelize.STRING,
      },
      TRP_Img: {
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
    await queryInterface.dropTable('Transportation');
  },
};
