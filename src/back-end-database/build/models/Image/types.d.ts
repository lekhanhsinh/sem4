import mongoose from "mongoose";
export declare type Image = {
    id: string;
    name: string;
    path: string;
    description: string;
};
export declare type ImageDocument = mongoose.Document & Image & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
};
