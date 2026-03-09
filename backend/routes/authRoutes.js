const express = require("express");
const router = express.Router();
const authController = require("../controller/authController")
const { body } = require("express-validator")


router.post('/register', body("email").isEmail().withMessage("Geçerli bir email giriniz"),
    body("password").isLength({ min: 6 }).withMessage("Şifre en az 6 karakter olmalı"),
    body("username").trim().notEmpty().withMessage("Kullanıcı adı boş olamaz"),
    authController.checkRegister)

router.post('/login', body("email").isEmail().withMessage("Geçerli bir email giriniz"),
    body("password").notEmpty().withMessage("Şifre boş olamaz"),
    authController.userLogin)



module.exports = router;