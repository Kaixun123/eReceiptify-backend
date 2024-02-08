const { Account, LoyalTier, LoyalProfile, PointsTransaction, Voucher, VoucherInstance } = require("../models");

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

        let profile = await LoyalProfile.findOne({
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

module.exports = {
    getLoyaltyProfile, 

};