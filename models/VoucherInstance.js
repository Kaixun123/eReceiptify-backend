const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");

class VoucherInstance extends Model { }

VoucherInstance.init(
    {
       id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);

module.exports = VoucherInstance;