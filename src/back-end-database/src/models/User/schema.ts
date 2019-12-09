import mongoose from "mongoose";

const schema = new mongoose.Schema({

    email: {
        type: String,
        lowercase: true,
        unique: true
    },

    password: String

}, { timestamps: true, autoIndex: true });

export default schema;
