const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");

class LoyaltyTier extends Model {}

LoyaltyTier.init(
    {
        tier: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        maxPoints: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        minPoints: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
    },
    {
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);

module.exports = LoyaltyTier;