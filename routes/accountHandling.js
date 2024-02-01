const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create-account", (res, req) => accountController.createAccount(res, req));
router.post("/login", (res, req) => accountController.login(res, req));
router.get("/get-userInfo", (res, req) => accountController.getUserInfo(res, req));
router.post("/logout", (res, req) => accountController.logout(res, req));

module.exports = router;