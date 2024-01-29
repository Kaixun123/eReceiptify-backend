const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");

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
            autoIncrement: true,
        },
        Total: {
            type: DataTypes.FLOAT,
            autoIncrement: true,
        },
    }, 
    {
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);

module.exports = Receipt;