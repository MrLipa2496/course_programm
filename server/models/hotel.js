'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate (models) {
      Hotel.hasMany(models.Tour_Hotel, {
        foreignKey: {
          name: 'TH_HT_ID',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Hotel.init(
    {
      HT_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      HT_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 100],
        },
      },
      HT_Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      HT_Category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['Luxury', 'Budget', 'Middle']],
            msg: 'Category must be one of: Luxury, Budget, Middle',
          },
        },
      },
      HT_Stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Stars must be an integer value' },
          min: { args: [1], msg: 'Stars must be at least 1' },
          max: { args: [5], msg: 'Stars cannot exceed 5' },
        },
      },
      HT_Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      HT_Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      HT_Img: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Hotel',
    }
  );
  return Hotel;
};
