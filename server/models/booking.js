'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate (models) {
      Booking.belongsTo(models.Client, {
        foreignKey: {
          name: 'BK_CL_ID',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });

      Booking.belongsTo(models.Tour, {
        foreignKey: {
          name: 'BK_TR_ID',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  Booking.init(
    {
      BK_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      BK_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: 'Booking date must be a valid date' },
          isAfter: {
            args: new Date().toISOString(),
            msg: 'Booking date must be in the future',
          },
        },
      },
      BK_Status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['pending', 'confirmed', 'cancelled']],
            msg: 'Status must be one of: pending, confirmed, cancelled',
          },
        },
      },
      BK_TotalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: { msg: 'Total amount must be a decimal value' },
          min: { args: [0], msg: 'Total amount must be at least 0' },
        },
      },
      BK_CL_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Client ID must be an integer' },
        },
      },
      BK_TR_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Tour ID must be an integer' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
