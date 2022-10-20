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
        .populate({
            path: 'products',
            populate: { path: 'product' }
        })
        .limit(limit)
        .skip(offset)


    return sendResponse(res, 200, true, { orders, totalPages, count }, null, "Get Currenr Order successful")

})

orderController.getOrderSeller = catchAsync(async (req, res, next) => {

    const userId = req.userId;
    let { page, limit, status, ...filterQuery } = req.query

    const filterKeys = Object.keys(filterQuery);
    if (filterKeys.length)
        throw new AppError(400, "Not accepted query", "Bad Request");

    const filterConditions = [{ isDeleted: false }]
    if (status) {
        filterConditions.push({
            status: { $regex: status, $options: "i" },
        })
    }
    const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

    const count = await Order.countDocuments(filterCritera)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1)

    let orders = await Order.find(filterCritera)
        .sort({ createdAt: -1 })
        .populate("userId")
        .populate({
            path: 'products',
            populate: { path: 'product' },
        })
        .limit(limit)
        .skip(offset)

    let ordersSeller = []
    orders.map((order) => {
        order.products.forEach((product) => {
            if (product.sellerId === userId)
                ordersSeller = [...ordersSeller, {
                    orderId: order._id,
                    buyerName: order.name,
                    addressShiping: order.addressShiping,
                    phone: order.phone,
                    productName: product.product.productName,
                    price: product.product.price,
                    amount: product.amount,
                    sum: product.sum,
                    status: order.status
                }]
        })
    })

    const countCurent = ordersSeller.length

    return sendResponse(res, 200, true, { ordersSeller, totalPages, count, countCurent }, null, "Get Currenr Order successful")

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

    const id = req.params.id;

    let order = await Order.findById(id);
    console.log(order)
    if (!order) throw new AppError(400, "Order not found", "Update Order Error")

    const allows = [
        "status",
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