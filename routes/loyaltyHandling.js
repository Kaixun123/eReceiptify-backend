const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get("/get-loyalty-profile", (res, req) => loyaltyController.getLoyaltyProfile(res, req));


module.exports = router;