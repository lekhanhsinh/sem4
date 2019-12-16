import mongoose from "mongoose";
import { UserDocument, User } from "../User/types";

export type Image = {
    id: string;
    name: string;
    path: string;
    description: string;
    user: User;
}

export type ImageDocument = mongoose.Document & Image & {
    user: UserDocument;
}
