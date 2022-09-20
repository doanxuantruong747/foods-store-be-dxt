const { sendResponse } = require("../helpers/untils")
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const validators = {};

validators.validate = (validationArray) => async (req, res, next) => {

    await Promise.all(validationArray.map((validation) => validation === req));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const message = errors
        .array()
        .map((error) => error.msg)
        .join("&");
    return sendResponse(res, 422, false, null, { message }, "Validation Error")
};


validators.checkObjectId = (paramId) => {
    if (!mongoose.Types.ObjectId.isValid(paramId)) {
        throw new Error("Invalid ObjecId")
    }
    return true;
}

module.exports = validators;