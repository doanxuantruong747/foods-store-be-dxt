const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators")
const authentication = require("../middlewares/authentication");


/**
 * @route POST /users
 * @description Register new user
 * @body {name, email, password}
 * @access public 
 */
router.post("/",
    validators.validate([
        body("name", "Invalid name").exists().notEmpty,
        body("email", "Invalid email")
            .exists()
            .isEmail()
            .normalizeEmail({ gmail_remove_dots: false }),
        body("password", "Invalid password").exists().notEmpty(),
    ]), userController.register)


/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
router.get("/me", authentication.loginRequired, userController.getCurrentUser)


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
 * @route PUT /users/:id
 * @description Update user profile
 * @body {name, avataUrl,address}
 * @access Login required
 */
router.put("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    userController.updateProfile)



module.exports = router;