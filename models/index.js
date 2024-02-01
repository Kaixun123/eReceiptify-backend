const Account = require("./Account");
const Card = require("./Card");
const Receipt = require("./Receipt");
const ReceiptItem = require("./ReceiptItem");
const LoyaltyPoints = require("./LoyaltyPoints");
const PointsTransaction = require("./PointsTransaction");
const Voucher = require("./Voucher");
const VoucherInstance = require("./VoucherInstance");

Account.hasMany(Card, {
    foreignKey: "linkedAccountId",
    onDelete: "CASCADE",
});

Card.belongsTo(Account, {
    foreignKey: "linkedAccountId",
});

Card.hasMany(Receipt, {
    foreignKey: "linkedCardId",
    onDelete: "CASCADE"
});

Receipt.belongsTo(Card, {
    foreignKey: "linkedCardId",
});

Receipt.hasMany(ReceiptItem, {
    foreignKey: "linkedReceiptId",
    onDelete: "CASCADE"
});

ReceiptItem.belongsTo(Receipt, {
    foreignKey: "linkedReceiptId",
});

