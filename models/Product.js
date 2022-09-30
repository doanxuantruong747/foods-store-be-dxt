const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = Schema(
    {
        productName: { type: String, required: true },
        describe: { type: String, required: true },
        foods: { type: String, enum: ["Processing", "Unprocessed", "Vegetable"], required: true },
        price: { type: Number, required: true },
        priceSale: { type: Number, required: false },
        unit: { type: String, required: true },
        image: { type: [], required: true },

        rating: { type: Number, required: false },
        feedback: { type: [{}], required: false },
        isDeleted: { type: Boolean, default: false, required: true },

        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },


    },
    { timestamps: true }
);



const Product = mongoose.model("Product", productSchema);
module.exports = Product;