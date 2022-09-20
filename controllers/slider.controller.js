const { sendResponse, AppError, catchAsync } = require("../helpers/untils")
const Slider = require("../models/Slider");

const sliderController = {};

sliderController.createNewSlider = catchAsync(async (req, res, next) => {

    let { sliderShow } = req.body

    let slider = await Slider.findOne({ sliderShow });
    if (slider)
        throw new AppError(400, "Slider already exists", " Err Create Slider")

    //process

    slider = await Slider.create({ sliderShow })

    // response
    sendResponse(
        res,
        200,
        true,
        slider,
        null,
        "Create Slider successful")

})


sliderController.getSlider = catchAsync(async (req, res, next) => {

    let { page, limit, ...filterQuery } = req.query

    const filterKeys = Object.keys(filterQuery);
    if (filterKeys.length)
        throw new AppError(400, "Not accepted query", "Bad Request");

    let Sliders = await Slider.find({ isDeleted: false })
        .sort({ createdAt: -1 })

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const count = Sliders.length;
    const totalPages = Math.ceil(count / limit);

    return sendResponse(res, 200, true, { Sliders, totalPages, count }, null, "Get Currenr Slider successful")

})



module.exports = sliderController