import mongoose from "mongoose";

export type Image = {
    id: string;
    name: string;
    path: string;
    description: string;
}

export type ImageDocument = mongoose.Document & Image & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}
