const express = require('express');
const router = express.Router();

router.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

//authApi
const authApi = require('./auth.api');
router.use("/auth", authApi)

//userApi
const usersApi = require('./user.api');
router.use("/users", usersApi)

//productApi
const productApi = require('./product.api');
router.use("/products", productApi)

//oderApi
const orderApi = require('./order.api');
router.use("/orders", orderApi)

//cartApi
const cartApi = require('./cart.api');
router.use("/carts", cartApi)

//sliderApi
const sliderApi = require('./slider.api');
router.use("/sliders", sliderApi)

module.exports = router;
