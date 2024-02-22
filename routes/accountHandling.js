const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create-account", (req, res) => accountController.createAccount(req, res));
router.post("/login", (req, res) => accountController.login(req, res));
router.get("/get-userInfo", (req, res) => accountController.getUserInfo(req, res));
router.post("/logout", (req, res) => accountController.logout(req, res));

module.exports = router;