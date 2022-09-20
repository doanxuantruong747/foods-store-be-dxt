const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators")
const authentication = require("../middlewares/authentication");



/**
 * @route POST /products
 * @description Create a new products
 * @body {name, imge,describe,foods:[ foodProcessing,unprocessedFood], price,unit,amount}
 * @access Seller Login required
 */
router.post(
    "/",
    authentication.loginRequired,
    validators.validate([
        body("productName", "Missing productName").exists().notEmpty(),
        body("describe", "Missing describe").exists().notEmpty(),
        body("foods", "Missing foods").exists().notEmpty(),
        body("unit", "Missing unit").exists().notEmpty(),
        body("image", "Missing image").exists().notEmpty(),
    ]),
    productController.createNewProduct
)


/**
 * @route GET /products?page=1&limit=10&name=`$productName`
 * @description Get products with pagination
 * @access public
 */
router.get("/", productController.getProduct)


/**
 * @route GET /products/:id
 * @description Get a product
 * @access public
 */
router.get("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    productController.getSingleProduct)



/**
 * @route PUT /products
 * @description Update a new products
 * @body {name, imge,describe,foods:[ foodProcessing,unprocessedFood], price,unit,amount}
 * @access Seller Login required
 */
router.put("/:id",
    authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ]),
    productController.updateSingleProduct)



/**
 * @route DELETE /products/:id
 * @description Delete a product
 * @access Login required
 */
router.delete("/:id", authentication.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId)
    ])
    , productController.deleteSingleProduct
);


module.exports = router;