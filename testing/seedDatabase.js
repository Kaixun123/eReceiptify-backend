require("dotenv").config({ path: "../.env" });
const { sequelize } = require("../services/database");
const waterfall = require("async").waterfall;
const { Account, Card, Receipt, ReceiptItem, Voucher, VoucherInstance } = require('../models')
const bcrypt = require("bcryptjs");

waterfall([seedDatabase, addUsers, addCards, addReceipts, addVouchers], function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Database seeded successfully");
    }
});


async function seedDatabase() {
    try {
        await sequelize.sync({ force: true });
    }
    catch (error) {
        console.log(error);
    }
}
async function addUsers() {
    try {
        let password_salt = await bcrypt.genSalt(10)
        let password_hash = await bcrypt.hash("password", password_salt)
        await Account.bulkCreate([
            {
                fname: "John",
                lname: "Doe",
                emailAddress: "john.doe.2022@smu.edu.sg",
                phoneNumber: "12345678",
                hash: password_hash,
                salt: password_salt
            },
            {
                fname: "Jane",
                lname: "Doe",
                emailAddress: "jane.doe.2023@smu.edu.sg",
                phoneNumber: "87654321",
                hash: password_hash,
                salt: password_salt
            },
            {
                fname: "Sathwik",
                lnaem: "Kumar",
                emailAddress: "sathwik@hotmail.com",
                phoneNumber: "12345678",
                hash: password_hash,
                salt: password_salt
            }
        ]);
    } catch (error) {
        console.log(error);
    }
};

async function addCards() {
    try {
        let card_salt = await bcrypt.genSalt(10)
        let card_hash = await bcrypt.hash("1234567890123456", card_salt)
        await Card.bulkCreate([
            {
                cardNumber: card_hash,
                expiryDate: "12/25",
                cvv: "123",
                linkedAccountId: 1,
                cardType: "Credit",
                cardNetwork: "Visa",
                salt: card_salt
            },
            {
                cardNumber: card_hash,
                expiryDate: "12/25",
                cvv: "123",
                linkedAccountId: 2,
                cardType: "Debit",
                cardNetwork: "Mastercard",
                salt: card_salt
            }
        ]);
    }
    catch (error) {
        console.log(error);
    }
};

async function addReceipts() {
    try {
        const data = [
            { id: '1', description: "Grocery Shopping at Local Market", amount: "$75.43", date: "2023-01-02" },
            { id: '2', description: "Movie Night - Tickets for Two", amount: "$35.00", date: "2023-01-05" },
            { id: '3', description: "Online Course Subscription", amount: "$99.99", date: "2023-01-08" },
            { id: '4', description: "Dinner at Italian Restaurant", amount: "$60.75", date: "2023-01-12" },
            { id: '5', description: "Clothing Shopping at Fashion Store", amount: "$120.25", date: "2023-01-15" },
            { id: '6', description: "Electronics Purchase - Laptop", amount: "$899.99", date: "2023-01-18" },
            { id: '7', description: "Gas Refill at Shell Station", amount: "$40.50", date: "2023-01-21" },
            { id: '8', description: "Books and Magazines at Bookstore", amount: "$45.30", date: "2023-01-24" },
            { id: '9', description: "Healthcare - Doctor's Visit", amount: "$150.00", date: "2023-01-28" },
            { id: '10', description: "Home Improvement - Paint and Supplies", amount: "$85.60", date: "2023-02-02" },
            { id: '11', description: "Grocery Shopping at Farmer's Market", amount: "$62.20", date: "2023-02-05" },
            { id: '12', description: "Concert Tickets for Favorite Band", amount: "$80.00", date: "2023-02-09" },
            { id: '13', description: "Online Streaming Subscription", amount: "$14.99", date: "2023-02-13" },
            { id: '14', description: "Lunch with Friends at Cafe", amount: "$28.50", date: "2023-02-17" },
            { id: '15', description: "Sporting Goods at Outdoor Store", amount: "$95.25", date: "2023-02-21" },
            { id: '16', description: "Car Maintenance - Oil Change", amount: "$45.00", date: "2023-02-25" },
            { id: '17', description: "Electronics Accessories", amount: "$29.99", date: "2023-03-01" },
            { id: '18', description: "Dinner at Sushi Restaurant", amount: "$55.80", date: "2023-03-05" },
            { id: '19', description: "Monthly Gym Membership", amount: "$50.00", date: "2023-03-09" },
            { id: '20', description: "Home Decor - New Bedding", amount: "$120.50", date: "2023-03-13" },
            { id: '21', description: "Grocery Shopping at Supermarket", amount: "$90.30", date: "2023-03-17" },
            { id: '22', description: "Tech Gadgets - Smartwatch", amount: "$199.99", date: "2023-03-21" },
            { id: '23', description: "Coffee and Pastries at Local Cafe", amount: "$18.75", date: "2023-03-25" },
            { id: '24', description: "Home Office Supplies", amount: "$55.60", date: "2023-03-29" },
            { id: '25', description: "Concert Tickets for Comedy Show", amount: "$40.00", date: "2023-04-02" },
            { id: '26', description: "Online Shopping - Fashion Accessories", amount: "$65.20", date: "2023-04-06" },
            { id: '27', description: "Pet Supplies - Food and Toys", amount: "$32.50", date: "2023-04-10" },
            { id: '28', description: "Dinner at Steakhouse", amount: "$75.90", date: "2023-04-14" },
            { id: '29', description: "Home Renovation - Kitchen Upgrade", amount: "$1200.00", date: "2023-04-18" },
            { id: '30', description: "Grocery Shopping at Health Food Store", amount: "$80.00", date: "2023-04-22" },
        ];
        for (const transaction of data) {
            const { id, description, amount, date } = transaction;

            // Create a receipt for each transaction
            const receipt = await Receipt.create({
                invoiceId: id,
                Total: parseFloat(amount.slice(1)), // Remove "$" sign and convert to float
                linkedAccountId: 1, // Adjust as per your logic for linking accounts
                linkedCardId: 1, // Adjust as per your logic for linking cards
            });

            // Create a receipt item for each transaction
            await ReceiptItem.create({
                itemType: "Normal",
                itemName: description,
                itemPrice: parseFloat(amount.slice(1)), // Remove "$" sign and convert to float
                itemQuantity: 1, // Assuming each transaction is for one item
                linkedReceiptId: receipt.id,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function addVouchers() {
    try {
        const data = [
            { id: '1', voucherName: "10% off on Electronics", voucherDescription: "Get 10% off on all electronics items", voucherType: "Discount", voucherAmount: 10, voucherStatus: "Available", voucherMaxRedeem: 100, linkedLoyaltyProfileId: 1 },
            { id: '2', voucherName: "Free Coffee", voucherDescription: "Enjoy a free coffee on us", voucherType: "Freebie", voucherStatus: "Available", voucherMaxRedeem: 50, linkedLoyaltyProfileId: 2 },
            // Add more voucher data as needed
        ];
        for (const voucherData of data) {
            const { id, voucherName, voucherDescription, voucherType, voucherAmount, voucherStatus, voucherMaxRedeem, linkedLoyaltyProfileId } = voucherData;

            // Create the voucher
            const voucher = await Voucher.create({
                id,
                voucherName,
                voucherDescription,
                voucherType,
                voucherAmount,
                voucherStatus,
                voucherMaxRedeem,
                linkedLoyaltyProfileId,
            });

            // Assuming each voucher is created with an initial instance
            await VoucherInstance.create({
                status: 'active',
                linkedVoucherId: voucher.id,
            });
        }

        console.log("Vouchers added successfully!");
    } catch (error) {
        console.error("Error adding vouchers:", error);
    }
}