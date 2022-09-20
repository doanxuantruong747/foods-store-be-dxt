const { sendResponse, AppError, catchAsync } = require("../helpers/untils")
const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs")

const sellerController = {};

sellerController.register = catchAsync(async (req, res, next) => {

    // get data from request
    let { sellerName, email, password } = req.body

    let seller = await Seller.findOne({ email });
    if (seller)
        throw new AppError(400, "Seller already exists", "Registration Err")

    //process
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    seller = await Seller.create({ sellerName, email, password })
    const accessTonken = await seller.generateToken();

    // response
    sendResponse(
        res,
        200,
        true,
        { seller, accessTonken },
        null,
        "Create seller successful")

})


sellerController.getSingleSeller = catchAsync(async (req, res, next) => {

    const sellerId = req.params.id;

    let seller = await Seller.findById(sellerId);
    if (!seller)
        throw new AppError(400, "Seller not found", "Get Single Seller Error")


    return sendResponse(res, 200, true, seller, null, "Get Single Seller successful")
});


sellerController.updateProfile = catchAsync(async (req, res, next) => {

    const sellerId = req.params.id;

    let seller = await Seller.findById(sellerId);
    if (!seller)
        throw new AppError(400, "Seller not found", "Update Seller Error")

    const allows = [
        "sellerName",
        "logoUrl",
        "address",
        "company",
        "phone",
    ];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            seller[field] = req.body[field]
        }
    });
    await seller.save();

    return sendResponse(res, 200, true, seller, null, "Update Seller successful")
});

module.exports = sellerController