'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transportation extends Model {
    static associate (models) {
      Transportation.hasMany(models.Tour_Transportation, {
        foreignKey: {
          name: 'TT_TRP_ID',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Transportation.init(
    {
      TRP_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TRP_Type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Bus', 'Train', 'Airplane', 'Car']],
        },
      },
      TRP_CarrierName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TRP_Cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      TRP_Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TRP_Email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      TRP_Img: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Transportation',
      tableName: 'Transportation',
    }
  );
  return Transportation;
};
