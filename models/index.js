const Account = require("./Account");
const Card = require("./Card");
const Receipt = require("./Receipt");
const ReceiptItem = require("./ReceiptItem");
const LoyaltyProfile = require("./LoyaltyProfile");
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


Account.hasMany(Receipt, {
    foreignKey: "linkedAccountId",
    onDelete: "CASCADE",
});

Account.belongsTo(Receipt, {
    foreignKey: "linkedAccountId",
});


Account.hasOne(LoyaltyProfile, {
    foreignKey: "linkedAccountId",
    onDelete: "CASCADE"
});

LoyaltyProfile.belongsTo(Receipt, {
    foreignKey: "linkedAccountId",
});

LoyaltyProfile.hasMany(PointsTransaction, {
    foreignKey: "linkedLoyaltyPointsId",
    onDelete: "CASCADE"
})

PointsTransaction.belongsTo(LoyaltyProfile, {
    foreignKey: "linkedLoyaltyPointsId"
});

Voucher.belongsToMany(LoyaltyProfile, {
    through: VoucherInstance
});