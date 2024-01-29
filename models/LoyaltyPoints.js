const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");

class loyaltyPoints extends Model { }

loyaltyPoints.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tier: {
            type: DataTypes.ENUM,
            values: ["None", "Bronze", "Sliver", "Gold"],
            defaultValue: "None",
        },
        totalPoints: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        renewalAmount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        renewalDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);

module.exports = loyaltyPoints;