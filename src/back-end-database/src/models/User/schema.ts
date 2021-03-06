import mongoose from "mongoose";

const schema = new mongoose.Schema({

    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: String,
    name: String,
    gender: String,
    address: String,
    phoneNumber: String,
    dateOfBirth: Date

}, { timestamps: true, autoIndex: true });

export default schema;
