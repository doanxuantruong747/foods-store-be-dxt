const express = require("express");
const sliderController = require("../controllers/slider.controller");
const router = express.Router();


/**
 * @route POST /slider
 * @description Create a new products
 * @body {name, imge,describe,foods:[ foodProcessing,unprocessedFood], price,unit,amount}
 * @access Seller Login required
 */
router.post(
    "/",
    sliderController.createNewSlider
)

/**
 * @route GET /slider?page=1&limit=10
 * @description Get slider with pagination
 * @access public
 */
router.get("/", sliderController.getSlider)



module.exports = router;