const express = require("express");
const sellerController = require("../controllers/seller.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators")
const authentication = require("../middlewares/authentication");



/**
 * @route POST /seller
 * @description Register new user
 * @body {sellerName, email, password}
 * @access public 
 */
router.post("/",
    validators.validate([
        body("sellerName", "Invalid name").exists().notEmpty,
        body("email", "Invalid email")
            .exists()
            .isEmail()
            .normalizeEmail({ gmail_remove_dots: false }),
        body("password", "Invalid password").exists().notEmpty(),
    ]), sellerController.register)



/**
 * @route GET /seller/:id
 * @description Get a seller profile
 * @access Seller Login required
 */
router.get("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ])
    , sellerController.getSingleSeller
);



/**
 * @route PUT /seller/:id
 * @description Update seller profile
 * @body {sellerName, logoUrl, address, company, phone}
 * @access Seller Login required
 */

router.put("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    sellerController.updateProfile)



module.exports = router;