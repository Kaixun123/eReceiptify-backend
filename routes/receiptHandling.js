const express = require('express');
const router = express.Router();
const receipentController = require('../controllers/receiptController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post("/generate-qr-code", (res, req) => receipentController.generateQRCode(res, req));
router.post("/payment-transaction", (res, req) => receipentController.paymentTransaction(res, req));

module.exports = router;