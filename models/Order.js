const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = Schema(
    {
        name: { type: String, require: true },
        addressShiping: { type: String, require: true },
        phone: { type: Number, require: true },
        products: [{
            name: { type: String, require: true },
            price: { type: Number, require: true },
            amount: { type: Number, require: true },
            sum: { type: Number, require: true },

            sellerId: {
                type: Schema.Types.ObjectId, require: true,
                ref: "Seller"
            },
        }],
        priceShiping: { type: Number, require: true },
        total: { type: Number, require: true },
        userId: {
            type: Schema.Types.ObjectId, require: true,
            ref: "User"
        },
        status: { type: String, enum: ["preparing goods", "shipping to you", "complete"], default: "preparing goods", require: true },

        isDeleted: { type: Boolean, default: false, select: false },
    },
    { timestamps: true }
);



const Order = mongoose.model("Order", orderSchema);
module.exports = Order;