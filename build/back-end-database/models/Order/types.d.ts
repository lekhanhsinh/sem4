import mongoose from "mongoose";
import { Image, ImageDocument } from "../Image/types";
import { User, UserDocument } from "../User/types";
export declare type Order = {
    totalPrice: number;
    creditCardNumber: string;
    address: string;
    user: User;
    items: [{
        quantity: number;
        size: string;
        material: string;
        image: Image;
        totalPrice: number;
    }];
    status: string;
    charge: string;
    description: string;
};
export declare type OrderDocument = mongoose.Document & Order & {
    user: UserDocument;
    items: [{
        quantity: number;
        size: string;
        image: ImageDocument;
        totalPrice: number;
    }];
};
