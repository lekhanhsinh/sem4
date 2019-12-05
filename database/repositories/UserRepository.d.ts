import mongoose from "mongoose";
import BasicRepository from "./BasicRepository";
import { UserDocument } from "../models/User/types";
import { IUser } from "./types";
export declare class UserRepository extends BasicRepository<UserDocument> {
    constructor();
    getOneByEmail: (email: string) => mongoose.DocumentQuery<UserDocument | null, UserDocument, {}>;
    create: (user: IUser) => void;
    update: (id: string, user: IUser) => Promise<any>;
    updateDetail: (id: string, user: IUser) => Promise<any>;
    updatePassword: (id: string, password: string, newPassword: string) => Promise<UserDocument>;
    delete: (id: string) => Promise<UserDocument>;
}
export declare const userRepository: UserRepository;
