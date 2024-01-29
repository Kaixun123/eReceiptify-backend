const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");
const LoyaltyPoints = require("./LoyaltyPoints");

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
        linkedLoyaltyPointsId: {
            type: DataTypes.INTEGER,
            references: {
              model: LoyaltyPoints,
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