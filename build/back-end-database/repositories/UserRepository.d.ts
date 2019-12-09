import BasicRepository from "./BasicRepository";
import { UserDocument } from "../models/User/types";
export declare class UserRepository extends BasicRepository<UserDocument> {
    constructor();
    getOnebyEmail: (email: string, populate?: string[]) => Promise<UserDocument | null>;
    register: (email: string, password: string, repeatPassword: string, detail: unknown) => Promise<UserDocument>;
    updateDetail: (id: string, detail: unknown) => Promise<UserDocument>;
    updatePassword: (id: string, password: string, newPassword: string, repeatPassword: string) => Promise<UserDocument>;
}
export declare const userRepository: UserRepository;
