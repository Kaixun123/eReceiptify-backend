const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");
const LoyaltyProfile = require("./LoyaltyProfile");

class Voucher extends Model { }

Voucher.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        voucherName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        voucherDescription: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        voucherType: {
            type: DataTypes.ENUM,
            values: ["None", "Discount", "Freebie"],
            defaultValue: "None",
        },
        voucherAmount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        voucherStatus: {
            type: DataTypes.ENUM,
            values: ["None", "Available", "Fully Redeemed"],
            defaultValue: "None",
        },
        voucherMaxRedeem: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        voucherRedeemCount: {
            type: DataTypes.INTEGER,
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

module.exports = Voucher