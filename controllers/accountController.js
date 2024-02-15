const { Account, Card } = require("../models");

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const crypto = require("crypto");

const path = require('path');
const stream = require('stream');

const { sequelize } = require("../services/database");
const e = require("express");

const login = async (req, res, next) => {
    try {
        let { username, password } = req.body

        let user = await Account.findOne({
            where: {
                [Op.or]: [
                    { email: username },
                    { username: username }
                ]
            }
        }).then((result) => result).catch((err) => console.log(err))

        if (user) {
            let password_hash = await bcrypt.hash(password, user.salt)
            if (password_hash === user.password) {
                const token = jwt.sign(
                    { user_id: user.id, email: user.email, account_type: user.account_type },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "1d",
                    }
                );

                res.cookie("jwtToken", token, {
                    maxAge: 24 * 60 * 60 * 1000 * 365, // 1 year
                    signed: true,
                    // secure: true,
                })
                res.cookie("user", JSON.stringify({
                    user_id: user.id,
                    email: user.email,
                    account_type: user.account_type,
                    token: token,

                }),
                    {
                        maxAge: 24 * 60 * 60 * 1000 * 365, // 1 year
                        signed: true,
                        // secure: true,
                        httpOnly: true,
                    })
                res.status(200).json({
                    status: 200,
                    message: "Login success",
                    data: {
                        email: user.email,
                        id: user.id,
                        token: user.token,
                        account_type: user.account_type
                    }
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Invalid credentials"
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwtToken")
        res.clearCookie("user")
        res.status(200).json({
            status: 200,
            message: "Logout success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const createAccount = async (req, res, next) => {
    try {
        let { email, password } = req.body

        let user_duplicate = await Account.findOne({
            where: {
                email: email
            }
        }).then((result) => result).catch((err) => console.log(err))

        if (user_duplicate) {
            res.status(400).json({
                status: 400,
                message: "User already exist"
            })
        } else {
            let password_salt = await bcrypt.genSalt(10)
            let password_hash = await bcrypt.hash(password, password_salt)

            let user = await UserAccountModel.create({
                email: email,
                password: password_hash,
                salt: password_salt
            }).then((result) => result).catch((err) => console.log(err))

            if (user) {
                res.status(200).json({
                    status: 200,
                    message: "User created"
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Failed to create user"
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const getUserInfo = async (req, res, next) => {
    try {
        let user_id = await get_user_id(req)
        if (user_id) {
            let user_data = await Account.findOne({
                where: {
                    id: user_id
                }
            }).then((result) => result).catch((err) => console.log(err))
            res.status(200).json({
                status: 200,
                message: "User profile loaded",
                data: {
                    firstName: user_data.firstName,
                    lastName: user_data.lastName,
                    email: user_data.email,
                    phoneNumber: user_data.phoneNumber,
                }
            })
        } else {
            res.status(401).json({
                status: 401,
                message: "Unauthorised"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

module.exports = {
    login,
    logout,
    createAccount,
    getUserInfo
};