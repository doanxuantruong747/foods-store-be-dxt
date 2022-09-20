const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators")
const authentication = require("../middlewares/authentication");


/**
 * @route POST /oders
 * @description Create a new Oders
 * @body {productName,userName,amount0.}
 * @access Login required
 */
router.post(
    "/",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    orderController.createNewOrder
)


/**
 * @route GET /oders?page=1&limit=10
 * @description Get Oders with pagination
 * @access public
 */
router.get("/", authentication.loginRequired, orderController.getOrder)


/**
 * @route GET /oders/:id
 * @description Get a Oders
 * @access public
 */
router.get("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    orderController.getSingleOrder)



/**
 * @route PUT /oders
 * @description Update a new oders
 * @body {name, imge,describe,foods:[ foodProcessing,unprocessedFood], price,unit,amount}
 * @access Seller Login required
 */
router.put("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    orderController.updateSingleOrder)



/**
 * @route DELETE /oders/:id
 * @description Delete a oder
 * @access Login required
 */
router.delete("/:id", authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ])
    , orderController.deleteSingleOrder
);



module.exports = router;