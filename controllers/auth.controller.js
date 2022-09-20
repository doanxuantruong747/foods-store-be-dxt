const User = require("../models/User");
const Seller = require("../models/Seller");
const { sendResponse, AppError, catchAsync } = require("../helpers/untils")
const bcrypt = require("bcryptjs")

const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {

    // get data from request
    let { email, password } = req.body

    // Business Logic Validation
    let user = await User.findOne({ email }, "+password");
    if (!user)
        throw new AppError(400, "Invalid Credentials", "Login Err")

    //process
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError(400, "Wrong password", "Login Error");
    const accessTonken = await user.generateToken();
    // response
    sendResponse(
        res,
        200,
        true,
        { user, accessTonken },
        null,
        "Create user successful")

})


authController.loginSellerWithEmail = catchAsync(async (req, res, next) => {

    // get data from request
    let { email, password } = req.body

    // Business Logic Validation
    let seller = await Seller.findOne({ email }, "+password");
    if (!seller)
        throw new AppError(400, "Invalid Credentials", "Login Err")

    //process
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) throw new AppError(400, "Wrong password", "Login  Error");
    const accessTonken = await seller.generateToken();
    // response
    sendResponse(
        res,
        200,
        true,
        { seller, accessTonken },
        null,
        "Create Seller successful")


})


module.exports = authController