'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Hotels', {
      HT_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      HT_Name: {
        type: Sequelize.STRING,
      },
      HT_Address: {
        type: Sequelize.STRING,
      },
      HT_Category: {
        type: Sequelize.STRING,
      },
      HT_Stars: {
        type: Sequelize.INTEGER,
      },
      HT_Phone: {
        type: Sequelize.STRING,
      },
      HT_Email: {
        type: Sequelize.STRING,
      },
      HT_Img: {
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
    await queryInterface.dropTable('Hotels');
  },
};
