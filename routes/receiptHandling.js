const express = require('express');
const router = express.Router();
const receipentController = require('../controllers/receiptController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post("/generate-qr-code", (req, res) => receipentController.generateQRCode(req, res));
router.post("/payment-transaction", (req, res) => receipentController.paymentTransaction(req ,res));

module.exports = router;