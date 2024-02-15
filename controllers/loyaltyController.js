const { Account, LoyaltyTier, LoyaltyProfile, PointsTransaction, Voucher, VoucherInstance } = require("../models");

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const crypto = require("crypto");

const path = require('path');
const csv = require('csv-parser');
const stream = require('stream');

const { sequelize } = require("../services/database");
const e = require("express");

const getLoyaltyProfile = async (req, res, next) => {
    try {
        let { user_id } = req.body

        let profile = await LoyaltyProfile.findOne({
            where: {
                linkedAccountId: user_id
            }
        }).then((result) => result).catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error - Loyalty Profile Retrieval Failed"
        })
    }
}

const addPoints = async (req, res, next) => {
    try{
        let { user_id, points } = req.body

        let profile = await LoyaltyProfile.findOne({
            where: {
                linkedAccountId: user_id
            }
        }).then((result) => result).catch((err) => console.log(err))

        let newPoints = profile.points + points
        
        await LoyalProfile.update({
            points: newPoints
        }, {
            where: {
                linkedAccountId: user_id
            }
        }).then((result) => result).catch((err) => console.log(err))

        await PointsTransaction.create({
            transactionAmount: points,
            linkedLoyalProfileId: user_id,
            transactionType: "add",
            transactionName: "Points Addition"
        }).then((result) => result).catch((err) => console.log(err))
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error - Points Addition Failed"
        })
    }
}

const deductPoints = async (req, res, next) => {
    try{
        let { user_id, points } = req.body

        let profile = await LoyaltyProfile.findOne({
            where: {
                linkedAccountId: user_id
            }
        }).then((result) => result).catch((err) => console.log(err))

        let newPoints = profile.points - points
        
        await LoyalProfile.update({
            points: newPoints
        }, {
            where: {
                linkedAccountId: user_id
            }
        }).then((result) => result).catch((err) => console.log(err))

        await PointsTransaction.create({
            transactionAmount: points,
            linkedLoyalProfileId: user_id,
            transactionType: "Remove",
            transactionName: "Points Deduction"
        }).then((result) => result).catch((err) => console.log(err))
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error - Points Addition Failed"
        })
    }
}

const viewAvailableVoucher = async (req, res, next) => {
    try{
        let { user_id } = req.body

        let vouchers = await Voucher.findAll({
            where: {
                linkedAccountId: user_id,
                voucherStatus: {[Op.contains]: ["available", "fully redeemed"]}
            }
        }).then((result) => result).catch((err) => console.log(err))

        res.status(200).json({
            status: 200,
            message: "Voucher Retrieval Successful",
            data: vouchers
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error - Voucher Retrieval Failed"
        })
    }
}

const redeemVoucher = async(req, res, next) => {
    try{
        let { user_id, voucher_id } = req.body

        let voucher = await Voucher.findOne({
            where: {
                id: voucher_id
            }
        }).then((result) => result).catch((err) => console.log(err))

        if (voucher.voucherReedemCount < voucher.voucherMaxRedeemCount){
            await VoucherInstance.create({
                linkedVoucherId: voucher_id,
                linkedAccountId: user_id
            }).then((result) => result).catch((err) => console.log(err))

            await Voucher.update({
                voucherReedemCount: voucher.voucherReedemCount + 1
            }, {
                where: {
                    id: voucher_id
                }
            }).then((result) => result).catch((err) => console.log(err))

            await deductPoints(user_id);

            res.status(200).json({
                status: 200,
                message: "Voucher Redemption Successful"
            })
        } else {
            res.status(400).json({
                status: 400,
                message: "Voucher Fully Redeemed"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error - Voucher Redemption Failed"
        })
    }
}

module.exports = {
    getLoyaltyProfile, 
    addPoints,
    deductPoints,
    viewAvailableVoucher,
    redeemVoucher,
};