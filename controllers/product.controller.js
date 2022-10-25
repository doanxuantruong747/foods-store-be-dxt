const { sendResponse, AppError, catchAsync } = require("../helpers/untils")
const Product = require("../models/Product");

const productController = {};

productController.createNewProduct = catchAsync(async (req, res, next) => {

    const currentSellertId = req.userId;

    let { productName, describe, foods, price, priceSale, unit, image, rating } = req.body

    let product = await Product.findOne({ productName });
    if (product)
        throw new AppError(400, "Product already exists", " Err Create Product")

    product = await Product.create({ productName, describe, foods, price, priceSale, unit, image, rating, author: currentSellertId })

    product = await product.populate("author");

    sendResponse(
        res,
        200,
        true,
        product,
        null,
        "Create Product successful")

})


productController.getProduct = catchAsync(async (req, res, next) => {

    let { page, limit, name, ...filterQuery } = req.query

    const filterKeys = Object.keys(filterQuery);
    if (filterKeys.length)
        throw new AppError(400, "Not accepted query", "Bad Request");

    const filterConditions = [{ isDeleted: false }]
    if (name) {
        filterConditions.push({
            productName: { $regex: name, $options: "i" },
        })
    }
    const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

    const count = await Product.countDocuments(filterCritera)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1)

    let Products = await Product.find(filterCritera)
        .sort({ createdAt: -1 })
        .populate("author")
        .limit(limit)
        .skip(offset)

    return sendResponse(res, 200, true, { Products, totalPages, count }, null, "Get Currenr Product successful")

})

productController.getProductProminent = catchAsync(async (req, res, next) => {

    let { page, limit, name, ...filterQuery } = req.query

    const filterKeys = Object.keys(filterQuery);
    if (filterKeys.length)
        throw new AppError(400, "Not accepted query", "Bad Request");

    const filterConditions = [{ isDeleted: false, statusSale: "Prominent" }]
    if (name) {
        filterConditions.push({
            productName: { $regex: name, $options: "i" },
        })
    }
    const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

    const count = await Product.countDocuments(filterCritera)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1)

    let Products = await Product.find(filterCritera)
        .sort({ createdAt: -1 })
        .populate("author")
        .limit(limit)
        .skip(offset)

    return sendResponse(res, 200, true, { Products, totalPages, count }, null, "Get Currenr Product successful")

})


productController.getProductCurrentId = catchAsync(async (req, res, next) => {

    let { page, limit, name, ...filterQuery } = req.query
    let userId = req.params.id
    const filterKeys = Object.keys(filterQuery);
    if (filterKeys.length)
        throw new AppError(400, "Not accepted query", "Bad Request");

    const filterConditions = [{ isDeleted: false, author: userId }]
    if (name) {
        filterConditions.push({
            productName: { $regex: name, $options: "i" },
        })
    }
    const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

    const count = await Product.countDocuments(filterCritera)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1)

    let Products = await Product.find(filterCritera)
        .sort({ createdAt: -1 })
        .populate("author")
        .limit(limit)
        .skip(offset)

    return sendResponse(res, 200, true, { Products, totalPages, count }, null, "Get Currenr Product successful")

})


productController.getSingleProduct = catchAsync(async (req, res, next) => {
    const productId = req.params.id;

    let product = await Product.findById(productId).populate("author");
    if (!product)
        throw new AppError(400, "Product not found", "Get Single Product Error")


    return sendResponse(res, 200, true, product, null, "Get Single Product successful")
});


productController.updateSingleProduct = catchAsync(async (req, res, next) => {
    const currentSellertId = req.userId;
    const productId = req.params.id;

    let product = await Product.findById(productId);
    if (!product) throw new AppError(400, "Product not found", "Update Product Error")
    if (!product.author.equals(currentSellertId))
        throw new AppError(400, "Only author can edit product", "Update Product Error")

    const allows = [
        "productName",
        "describe",
        "foods",
        "price",
        "priceSale",
        "unit",
        "image"
    ];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            product[field] = req.body[field]
        }
    });
    await product.save();

    return sendResponse(res, 200, true, product, null, "Update Product successful")
});


productController.deleteSingleProduct = catchAsync(async (req, res, next) => {
    const currentSellerId = req.userId;
    const productId = req.params.id;

    let product = await Product.findOneAndUpdate(
        { _id: productId, author: currentSellerId },
        { isDeleted: true },
        { new: true }
    )
    if (!product) throw new AppError(400, "Post not found or Product not authorrized", "Deleta Product Error")

    return sendResponse(res, 200, true, product, null, "Delete Product successful")
});


module.exports = productController