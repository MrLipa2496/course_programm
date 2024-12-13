'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      BK_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BK_Date: {
        type: Sequelize.DATE,
      },
      BK_Status: {
        type: Sequelize.STRING,
      },
      BK_TotalAmount: {
        type: Sequelize.DECIMAL,
      },
      BK_CL_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'CL_ID',
        },
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      BK_TR_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tours',
          key: 'TR_ID',
        },
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('Bookings');
  },
};
