const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },

        avataUrl: { type: String, required: false, default: "" },
        address: { type: String, required: false, default: "" },
        phone: { type: Number, required: false, },
        comment: { type: String, required: false, default: "" },

        isDeleted: { type: Boolean, default: false, select: false },

    },
    { timestamps: true }
);

userSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.password;
    delete user.isDeleted;
    return user;
}

userSchema.methods.generateToken = async function () {
    const accessTonken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: "1d" });
    return accessTonken;
}

const User = mongoose.model("User", userSchema);
module.exports = User;