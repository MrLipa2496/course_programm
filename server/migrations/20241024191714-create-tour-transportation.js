'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tour_Transportations', {
      TT_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TT_TR_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tours',
          key: 'TR_ID',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      TT_TRP_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Transportation',
          key: 'TRP_ID',
        },
        allowNull: false,
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Tour_Transportations');
  },
};
