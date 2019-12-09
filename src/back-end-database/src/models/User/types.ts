import mongoose from "mongoose";

export type User = {
    id: string;
    email: string;
    password: string;
}

export type UserDocument = mongoose.Document & User & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}
