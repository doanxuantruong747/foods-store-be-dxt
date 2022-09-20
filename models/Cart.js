const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cartSchema = Schema(
    {
        productId: {
            type: Schema.Types.ObjectId, require: true,
            ref: "Product"
        },
        author: {
            type: Schema.Types.ObjectId, require: true,
            ref: "User"
        },
        amount: { type: Number, required: true },

    },
    { timestamps: true }
);



const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;