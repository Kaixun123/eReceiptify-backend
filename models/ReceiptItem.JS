const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../services/database");
const Receipt = require("./Receipt");

class ReceiptItem extends Model { }

ReceiptItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        itemType: {
            type: DataTypes.ENUM,
            values: ["None", "Normal", "SubCharge"],
            defaultValue: "None",
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        itemPrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        itemQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        linkedReceiptId: {
            type: DataTypes.INTEGER,
            references: {
              model: Receipt,
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

module.exports = ReceiptItem;