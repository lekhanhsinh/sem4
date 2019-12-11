import mongoose from "mongoose";
import { Image, ImageDocument } from "../Image/types";
import { User, UserDocument } from "../User/types";

export type Order = {
    totalPrice: number;
    creditCardNumber: string;
    address: string;
    user: User;
    items: [{
        quantity: number;
        size: string;
        image: Image;
        totalPrice: number;
    }];
}

export type OrderDocument = mongoose.Document & Order & {
    user: UserDocument;
    items: [{
        quantity: number;
        size: string;
        image: ImageDocument;
        totalPrice: number;
    }];
}
