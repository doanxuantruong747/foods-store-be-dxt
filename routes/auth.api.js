const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const { body } = require("express-validator");
const validators = require("../middlewares/validators")

/**
 * @route POST /auth/loginUser
 * @description Log in with username and password
 * @body {email, password}
 * @access public 
 */
router.post("/login",
    validators.validate([
        body("email", "Invalid email")
            .exists()
            .isEmail()
            .normalizeEmail({ gmail_remove_dots: false }),
        body("password", "Invalid password").exists().notEmpty(),
    ]),
    authController.loginWithEmail)



/**
 * @route POST /auth/login/seller
 * @description Log in with sellername and password
 * @body {email, password}
 * @access public 
 */
router.post("/login/seller",
    validators.validate([
        body("email", "Invalid email")
            .exists()
            .isEmail()
            .normalizeEmail({ gmail_remove_dots: false }),
        body("password", "Invalid password").exists().notEmpty(),
    ]),
    authController.loginSellerWithEmail)


module.exports = router;