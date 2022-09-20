const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { AppError } = require("../helpers/untils")

const authentication = {};

authentication.loginRequired = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;

        if (!tokenString)
            throw new AppError(401, "Login required", "Authentication Error")

        const token = tokenString.replace("Bearer ", "");

        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                if (err.name === "TokenExpriredError") {
                    throw new AppError(401, "Token exprired", "Authentication Error")
                } else {
                    throw new AppError(401, "Token is invalid", "Authentication Error")
                }
            }
            req.userId = payload._id;

        });
        next();
    } catch (error) {
        next(error);
    }
}



module.exports = authentication;