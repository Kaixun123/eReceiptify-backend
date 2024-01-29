const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");

class Card extends Model { }

Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cardType: {
            type: DataTypes.ENUM,
            values: ["None", "Credit", "Debit", "Prepaid"],
            defaultValue: "None",
        },
        cardNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        salt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiryDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cvv: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cardNetwork: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, 
    {
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);

module.exports = Card;