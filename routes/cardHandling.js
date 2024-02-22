const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get("/get-cards", (req, res) => cardController.getCards(req, res));
router.post("/add-card", (req, res) => cardController.addCard(req, res));
router.delete("/delete-card", (req, res) => cardController.deleteCard(req, res));
router.patch("/update-card", (req, res) => cardController.updateCard(req, res));
router.get("/get-card", (req, res) => cardController.getCard(req, res));

module.exports = router;