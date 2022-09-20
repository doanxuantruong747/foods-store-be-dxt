const { sendResponse, AppError, catchAsync } = require("../helpers/untils")
const User = require("../models/User");
const bcrypt = require("bcryptjs")

const userController = {};

userController.register = catchAsync(async (req, res, next) => {

    // get data from request
    let { name, email, password } = req.body

    let user = await User.findOne({ email });
    if (user)
        throw new AppError(400, "User already exists", "Registration Err")

    //process
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({ name, email, password })
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


userController.getCurrentUser = catchAsync(async (req, res, next) => {
    const currentUserId = req.userId;

    const user = await User.findById(currentUserId);
    if (!user)
        throw new AppError(400, "User not found", "Get Current User Error")

    return sendResponse(res, 200, true, user, null, "Get Currenr User successful")

})


userController.getSingleUser = catchAsync(async (req, res, next) => {

    const userId = req.params.id;

    let user = await User.findById(userId);
    if (!user)
        throw new AppError(400, "User not found", "Get Single User Error")


    return sendResponse(res, 200, true, user, null, "Get Single User successful")
});


userController.updateProfile = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user)
        throw new AppError(400, "User not found", "Update User Error")
    const allows = [
        "name",
        "avataUrl",
        "address",
    ];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            user[field] = req.body[field]
        }
    });
    await user.save();
    return sendResponse(res, 200, true, user, null, "Update User successful")
});

module.exports = userController