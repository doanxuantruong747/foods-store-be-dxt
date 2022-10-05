const User = require("../models/User");
const { sendResponse, AppError, catchAsync } = require("../helpers/untils")
const bcrypt = require("bcryptjs")

const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {

    // get data from request
    let { email, password } = req.body

    //Invalid Credentials
    // Business Logic Validation
    let user = await User.findOne({ email, buyer: true }, "+password");
    if (!user)
        throw new AppError(400, "email doesn't exist", "Login Err")

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


module.exports = authController