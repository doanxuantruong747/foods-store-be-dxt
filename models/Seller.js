const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const sellerSchema = Schema(
    {
        sellerName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },

        logoUrl: { type: String, required: false, default: "" },
        address: { type: String, required: false, default: "" },
        company: { type: String, required: false, default: "" },
        phone: { type: Number, required: false, default: +84 },

        isDeleted: { type: Boolean, default: false, select: false },

    },
    { timestamps: true }
);

sellerSchema.methods.toJSON = function () {
    const seller = this._doc;
    delete seller.password;
    delete seller.isDeleted;
    return seller;
}

sellerSchema.methods.generateToken = async function () {
    const accessTonken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: "1d" });
    return accessTonken;
}

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;