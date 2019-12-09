import mongoose from "mongoose";
export declare type User = {
    id: string;
    email: string;
    password: string;
};
export declare type UserDocument = mongoose.Document & User & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
};
