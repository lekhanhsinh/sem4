import mongoose from "mongoose";

export type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    gender: string;
    address: string;
    phoneNumber: string;
    dateOfBirth: Date;
}

export type UserDocument = mongoose.Document & User & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}
