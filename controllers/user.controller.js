const { sendResponse, AppError, catchAsync } = require("../helpers/untils")
const User = require("../models/User");
const bcrypt = require("bcryptjs")

const userController = {};

userController.registerUser = catchAsync(async (req, res, next) => {

    let { name, email, password } = req.body

    let user = await User.findOne({ email });

    if (user) {
        if (user.buyer === true)
            throw new AppError(400, "User already exists", "Registration Err")

        if (user.buyer === false && user.seller === true) {
            user.buyer = true;
            await user.save();
        }
    }

    if (!user) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        user = await User.create({ name, email, password, buyer: true })
    }

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

userController.registerSeller = catchAsync(async (req, res, next) => {
    let { name, email, password, phone, shopName } = req.body

    let user = await User.findOne({ email });

    if (user) {
        if (user.seller === true)
            throw new AppError(400, "User already exists", "Registration Err")

        if (user.seller === false && user.buyer === true) {
            const allows = ["phone", "shopName"]
            allows.forEach((field) => {
                if (req.body[field] !== undefined) {
                    user[field] = req.body[field]
                }
            });
            user.seller = true;
            await user.save();
        }
    }

    if (!user) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        user = await User.create({ name, email, password, phone, shopName, seller: true })
    }

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


userController.updateProfileUserBuyer = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user)
        throw new AppError(400, "User not found", "Update User Error")
    const allows = [
        "name",
        "avataUrl",
        "address",
        "phone",
        "city",
        "country",
    ];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            user[field] = req.body[field]
        }
    });
    await user.save();
    return sendResponse(res, 200, true, user, null, "Update User successful")
});


userController.updateProfileUserSeller = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user)
        throw new AppError(400, "User not found", "Update User Error")
    const allows = [
        "shopName",
        "logoUrl",
        "address",
        "phone",
        "company",
        "city",
        "country",
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