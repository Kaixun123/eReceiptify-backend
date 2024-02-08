const { Account, Card, Receipt, ReceiptItem } = require("../models");

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const crypto = require("crypto");

const path = require('path');
const csv = require('csv-parser');
const stream = require('stream');

const { sequelize } = require("../services/database");
const e = require("express");
const qrcode = require('qrcode');

const generateQRCode = async(req, res, next) => {
    try{
        let { invoiceInfo } = req.body

        const qrCode = await qrcode.toDataURL(invoiceInfo);
        return res.status(200).json({
            status: 200,
            message: "QR Code Generated",
            data: qrCode
        });
    }catch(error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error - QR Code Generation Failed"
        })
    }
}

const paymentTransaction = async(req, res, next) => {
    try{
        let { receiptTransaction, emailAddress } = req.body

        let user = await Account.findOne({
            where: {
                emailAddress: emailAddress
            }
        }).then((result) => result.id).catch((err) => console.log(err));

        let card = await Card.findOne({
            where: {
                linkedAccountId: user
            }
        }).then((result) => result.id).catch((err) => console.log(err));

        let receipt = await Receipt.create({
            invoiceId: crypto.randomBytes(16).toString('hex'),
            Total: receiptTransaction.amount,
            linkedAccountId: user,
            linkedCardId: card
        }).then((result) => result.id).catch((err) => console.log(err));

        console.log("receipt created");

        receiptTransaction.array.forEach(async receiptItem => {
            await receiptItem.create({
                linkedReceiptId: receipt,
                itemType: receiptItem.itemType,
                itemName: receiptItem.itemName,
                itemPrice: receiptItem.itemPrice,
                itemQuantity: receiptItem.itemQuantity
            }).then((result) => result).catch((err) => console.log(err));
        });

        console.log("receipt items created");

        return res.status(200).json({
            status: 200,
            message: "Transaction Successful"
        });

    }catch(error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error - Transaction Failed"
        })
    }
}

//--------------------------------------------------------------- helper functions ------------------------------------------------------


module.exports = {
    generateQRCode,
    paymentTransaction
};