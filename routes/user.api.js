const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators")
const authentication = require("../middlewares/authentication");


/**
 * @route POST /users/buyer
 * @description Register new user buyer
 * @body {name, email, password}
 * @access public 
 */
router.post("/buyer",
    validators.validate([
        body("name", "Invalid name").exists().notEmpty,
        body("email", "Invalid email")
            .exists()
            .isEmail()
            .normalizeEmail({ gmail_remove_dots: false }),
        body("password", "Invalid password").exists().notEmpty(),
    ]), userController.registerUser)


/**
 * @route POST /users/seller
 * @description Register new user seller
 * @body {name, email, password}
 * @access public 
 */
router.post("/seller",
    validators.validate([
        body("name", "Invalid name").exists().notEmpty,
        body("email", "Invalid email")
            .exists()
            .isEmail()
            .normalizeEmail({ gmail_remove_dots: false }),
        body("password", "Invalid password").exists().notEmpty(),
    ]), userController.registerSeller)


/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
router.get("/me",
    authentication.loginRequired,
    userController.getCurrentUser)


/**
 * @route GET /users/:id
 * @description Get a user profile
 * @access Login required
 */
router.get("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ])
    , userController.getSingleUser
);


/**
 * @route PUT /users/buyer/:id
 * @description Update user buyer profile
 * @body {name, avataUrl,address}
 * @access Login required
 */
router.put("/buyer/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    userController.updateProfileUserBuyer)


/**
 * @route PUT /users/seller/:id
 * @description Update user seller profile
 * @body {name, avataUrl,address}
 * @access Login required
 */
router.put("/seller/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    userController.updateProfileUserSeller)




module.exports = router;