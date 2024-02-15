const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");
const Account = require("./Account");
const Card = require("./Card");

class Receipt extends Model { }

Receipt.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        invoiceId: {
            type: DataTypes.STRING,
        },
        Total: {
            type: DataTypes.FLOAT,
        },
        linkedAccountId: {
            type: DataTypes.INTEGER,
            references: {
              model: Account,
              key: "id",
            },
            allowNull: false,
        },
        linkedCardId: {
            type: DataTypes.INTEGER,
            references: {
              model: Card,
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

module.exports = Receipt;