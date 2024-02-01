const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");

class Account extends Model { }

Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        salt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, 
    {
        timestamps: true,
        paranoid: true,
        sequelize,
    }
);

module.exports = Account;