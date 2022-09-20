const express = require("express");
const cartController = require("../controllers/cart.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators")
const authentication = require("../middlewares/authentication");



/**
 * @route POST /cart
 * @description Create a new cart
 * @body {productId:Types.ObjectId, authorUser:Types.ObjectId,amount}
 * @access Seller Login required
 */
router.post(
    "/",
    authentication.loginRequired,
    cartController.createCart
)


/**
 * @route GET /cart?page=1&limit=10&name=`$productName`
 * @description Get cart with pagination
 * @access public
 */
router.get("/",
    authentication.loginRequired,
    cartController.getCart)



/**
 * @route PUT /cart
 * @description Update a new cart
 * @body {amount}
 * @access Seller Login required
 */
router.put("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    cartController.updateSingleCart)




/**
 * @route DELETE /cart/:id
 * @description Delete a cartProduct
 * @access Login required
 */
router.delete("/:id", authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ])
    , cartController.deleteCart
);


module.exports = router;