import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name: String,
    path: String,
    description: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

}, { timestamps: true, autoIndex: true });

export default schema;
