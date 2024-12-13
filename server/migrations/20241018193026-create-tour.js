'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      TR_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TR_Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      TR_Description: {
        type: Sequelize.TEXT,
      },
      TR_FullInfo: {
        type: Sequelize.TEXT,
      },
      TR_Price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      TR_StartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: {
            args: new Date().toISOString(),
            msg: 'Start date must be after the current date.',
          },
        },
      },
      TR_EndDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter (value) {
            if (new Date(value) <= new Date(this.TR_StartDate)) {
              throw new Error('TR_EndDate must be after TR_StartDate');
            }
          },
        },
      },
      TR_TourType: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['Leisure', 'Excursion', 'Business trip']],
        },
      },
      TR_Destination: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      TR_Tags: {
        type: Sequelize.JSON,
      },
      TR_Img: {
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

    await queryInterface.addConstraint('Tours', {
      fields: ['TR_Price'],
      type: 'check',
      name: 'check_TR_Price',
      where: {
        TR_Price: {
          [Sequelize.Op.gt]: 0,
        },
      },
    });

    await queryInterface.addConstraint('Tours', {
      fields: ['TR_StartDate', 'TR_EndDate'],
      type: 'check',
      name: 'check_TR_Dates',
      where: {
        TR_EndDate: {
          [Sequelize.Op.gte]: Sequelize.col('TR_StartDate'),
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours');
  },
};
