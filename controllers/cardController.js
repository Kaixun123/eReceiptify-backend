const { Account, Card } = require('../models');

async function getCards(req, res) {
    let userID = req.body.userID;
    let userCards = await Card.findAll({
        where: {
            userID: userID
        }
    });
    res.status(200).json({
        status: 200,
        message: "Success",
        data: userCards
    });
}

async function getcard(req, res) {
    let cardID = req.body.cardID;
    let card = await Card.findOne({
        where: {
            id: cardID
        }
    });
    if (card == null)
        res.status(404).json({
            status: 404,
            message: "Card not found"
        });
    else
        res.status(200).json({
            status: 200,
            message: "Success",
            data: card
        });
}

async function addCard(req, res) {
    let { cardNumber, cardHolder, expirationDate, cvv, userID } = req.body;
    let card = await Card.create({
        cardNumber: cardNumber,
        cardHolder: cardHolder,
        expirationDate: expirationDate,
        cvv: cvv,
        userID: userID
    });
    res.status(201).json({
        status: 201,
        message: "Card added",
        data: card
    });
}