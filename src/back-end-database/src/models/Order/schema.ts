import mongoose from "mongoose";

const schema = new mongoose.Schema({

    totalPrice: Number,
    creditCardNumber: String,
    address: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    items: [{
        quantity: Number,
        size: String,
        image: {
            type: mongoose.Types.ObjectId,
            ref: "Image"
        },
        totalPrice: Number
    }],
    status: {
        type: String,
        default: "Ongoing"
    },
    charge: String,
    description: String

}, { timestamps: true, autoIndex: true });

export default schema;
