const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");
const Account = require("./Account");

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
        linkedAccountId: {
            type: DataTypes.INTEGER,
            references: {
              model: Account,
              key: "id",
            },
            allowNull: false,
        },
    }, 
    {
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);

module.exports = Card;