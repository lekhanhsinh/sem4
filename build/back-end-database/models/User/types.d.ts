import mongoose from "mongoose";
export declare type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    gender: string;
    address: string;
    phoneNumber: string;
    dateOfBirth: Date;
};
export declare type UserDocument = mongoose.Document & User & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
};
