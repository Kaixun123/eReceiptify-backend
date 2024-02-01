const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");
const Account = require("./Account"); 
const LoyaltyTier = require("./LoyaltyTier");

class LoyaltyProfile extends Model { }

LoyaltyProfile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        linkedAccountId: {
            type: DataTypes.INTEGER,
            references: {
              model: Account,
              key: "id",
            },
            allowNull: false,
        },
        linkedTierId: {
            type: DataTypes.INTEGER,
            references: {
              model: LoyaltyTier,
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

module.exports = LoyaltyProfile;