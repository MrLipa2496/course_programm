'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate (models) {
      Client.hasMany(models.Booking, {
        foreignKey: {
          name: 'BK_CL_ID',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  Client.init(
    {
      CL_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CL_FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: { msg: 'First name must contain only letters' },
          is: /^[A-Z][a-z]+$/,
          len: {
            args: [2, 50],
            msg: 'First name must be between 2 and 50 characters',
          },
        },
      },
      CL_LastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: { msg: 'Last name must contain only letters' },
          is: /^[A-Z][a-z]+$/,
          len: {
            args: [2, 50],
            msg: 'Last name must be between 2 and 50 characters',
          },
        },
      },
      CL_DateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: 'Date of birth must be a valid date' },
          isBefore: {
            args: new Date().toISOString(),
            msg: 'Date of birth must be in the past',
          },
        },
      },
      CL_Phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      CL_Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Must be a valid email address' },
        },
      },
      CL_Address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [5, 100],
            msg: 'Address must be between 5 and 100 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Client',
    }
  );
  return Client;
};
