const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get("/get-cards", (res, req) => cardController.getCards(res, req));
router.post("/add-card", (res, req) => cardController.addCard(res, req));
router.delete("/delete-card", (res, req) => cardController.deleteCard(res, req));
router.patch("/update-card", (res, req) => cardController.updateCard(res, req));
router.get("/get-card", (res, req) => cardController.getCard(res, req));

module.exports = router;