'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_Transportation extends Model {
    static associate (models) {
      Tour_Transportation.belongsTo(models.Tour, {
        foreignKey: {
          name: 'TT_TR_ID',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Tour_Transportation.belongsTo(models.Transportation, {
        foreignKey: {
          name: 'TT_TRP_ID',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Tour_Transportation.init(
    {
      TT_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TT_TR_ID: DataTypes.INTEGER,
      TT_TRP_ID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Tour_Transportation',
    }
  );
  return Tour_Transportation;
};
