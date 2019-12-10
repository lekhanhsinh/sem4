import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name: String,
    path: String,
    description: String

}, { timestamps: true, autoIndex: true });

export default schema;
