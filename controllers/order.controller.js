const { sendResponse, AppError, catchAsync } = require("../helpers/untils");

const Order = require("../models/Order");



const orderController = {};

orderController.createNewOrder = catchAsync(async (req, res, next) => {

    const userId = req.userId;
    const { name, addressShiping, phone, products, priceShiping, total } = req.body
    //process

    let order = await Order.create({
        name, addressShiping, phone, products, priceShiping, total, userId: userId
    })

    // response
    sendResponse(res, 200, true, order, null, "Create Order successful");
})


orderController.getOrder = catchAsync(async (req, res, next) => {

    const userId = req.userId;
    let { page, limit, name, ...filterQuery } = req.query

    const filterKeys = Object.keys(filterQuery);
    if (filterKeys.length)
        throw new AppError(400, "Not accepted query", "Bad Request");

    const count = await Order.countDocuments()

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1)


    let orders = await Order.find({ isDeleted: false, userId })
        .sort({ createdAt: -1 })
        .populate("userId")
        .limit(limit)
        .skip(offset)

    if (name)
        orders = orders.filter((order) => {
            if (order.name) {
                return (order.name.toLowerCase().includes(name.toLowerCase()));
            }
        })

    return sendResponse(res, 200, true, { orders, totalPages, count }, null, "Get Currenr Order successful")

})


orderController.getSingleOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.id;

    let order = await Order.findById(orderId)
        .sort({ createdAt: -1 })
        .populate("userId");

    if (!order)
        throw new AppError(400, "Order not found", "Get Single Order Error")


    return sendResponse(res, 200, true, order, null, "Get Single Order successful")
});


orderController.updateSingleOrder = catchAsync(async (req, res, next) => {

    const orderId = req.params.id;

    let order = await Order.findById(orderId);
    if (!order) throw new AppError(400, "Order not found", "Update Order Error")


    const allows = [
        "amount",
        "status"
    ];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            order[field] = req.body[field]
        }
    });
    await order.save();

    return sendResponse(res, 200, true, order, null, "Update Order successful")
});


orderController.deleteSingleOrder = catchAsync(async (req, res, next) => {
    const currentOderId = req.userId;
    const orderId = req.params.id;

    let order = await Order.findOneAndUpdate(
        { _id: orderId, author: currentOderId },
        { isDeleted: true },
        { new: true }
    )
    if (!order) throw new AppError(400, "Post not found or Order not authorrized", "Deleta Order Error")

    return sendResponse(res, 200, true, order, null, "Delete Order successful")
});


module.exports = orderController