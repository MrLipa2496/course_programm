'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_Hotel extends Model {
    static associate (models) {
      Tour_Hotel.belongsTo(models.Tour, {
        foreignKey: {
          name: 'TH_TR_ID',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Tour_Hotel.belongsTo(models.Hotel, {
        foreignKey: {
          name: 'TH_HT_ID',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Tour_Hotel.init(
    {
      TH_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TH_TR_ID: DataTypes.INTEGER,
      TH_HT_ID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Tour_Hotel',
    }
  );
  return Tour_Hotel;
};
