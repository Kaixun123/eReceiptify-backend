const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");
const LoyaltyProfile = require("./LoyaltyProfile");

class PointsTransaction extends Model { }

PointsTransaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        transactionType: {
            type: DataTypes.ENUM,
            values: ["None", "Add", "Remove", "Adjust"],
            defaultValue: "None",
        },
        transactionAmount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        transactionName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        linkedLoyaltyProfileId: {
            type: DataTypes.INTEGER,
            references: {
              model: LoyaltyProfile,
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

module.exports = PointsTransaction;