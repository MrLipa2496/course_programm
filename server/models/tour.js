'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    static associate (models) {
      Tour.hasMany(models.Booking, {
        foreignKey: {
          name: 'BK_TR_ID',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });

      Tour.hasMany(models.Tour_Transportation, {
        foreignKey: {
          name: 'TT_TR_ID',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Tour.hasMany(models.Tour_Hotel, {
        foreignKey: {
          name: 'TH_TR_ID',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Tour.init(
    {
      TR_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TR_Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      TR_Description: {
        type: DataTypes.TEXT,
      },
      TR_FullInfo: {
        type: DataTypes.TEXT,
      },
      TR_Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      TR_StartDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: new Date().toISOString(),
        },
      },
      TR_EndDate: {
        type: DataTypes.DATE,
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
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['Leisure', 'Excursion', 'Business trip']],
        },
      },
      TR_Destination: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      TR_Tags: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      TR_Img: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Tour',
    }
  );
  return Tour;
};
