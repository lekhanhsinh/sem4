import Joi from "@hapi/joi";

import BasicRepository from "./BasicRepository";
import * as Models from "../models";
import { UserDocument, User } from "../models/User/types";

const UserModel = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/),
    name: Joi.string(),
    gender: Joi.string().valid("MALE", "FEMALE"),
    address: Joi.string(),
    phoneNumber: Joi.number(),
    dateOfBirth: Joi.date().max("now")
});

export class UserRepository extends BasicRepository<UserDocument> {
    constructor() {
        super(Models.User);
    }

    getOnebyEmail = (
        email: string,
        populate: string[] = []
    ): Promise<UserDocument | null> => {
        return this._collection.findOne({ email })
            .populate(populate)
            .exec();
    }

    register = (
        email: string,
        password: string,
        repeatPassword: string,
        detail: unknown
    ): Promise<UserDocument> => {
        const RegisterModel = UserModel.concat(Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/).required(),
            repeatPassword: Joi.ref("password"),
        }));
        return RegisterModel.validateAsync(
            {
                email,
                password,
                repeatPassword,
                ...(detail as object)
            }
        ).then(() => {
            return this.create({
                email,
                password,
                repeatPassword,
                ...(detail as object)
            }) as Promise<UserDocument>;
        });
    }

    updateDetail = (
        id: string,
        detail: unknown
    ): Promise<UserDocument> => {
        return UserModel.validateAsync({
            ...(detail as object)
        }).then(() => {
            return this.getOnebyId(id).then(found => {
                if (!found) { throw new Error("User don\'t exist."); }
                found.name = (detail as User).name || found.name;
                found.gender = (detail as User).gender || found.gender;
                found.address = (detail as User).address || found.address;
                found.phoneNumber = (detail as User).phoneNumber || found.phoneNumber;
                found.dateOfBirth = (detail as User).dateOfBirth || found.dateOfBirth;
                return found.save();
            });
        });
    }

    updatePassword = (
        id: string,
        password: string,
        newPassword: string,
        repeatPassword: string
    ): Promise<UserDocument> => {
        const UpdatePasswordModel = Joi.object({
            newPassword: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/).required(),
            repeatPassword: Joi.ref("newPassword")
        });
        return UpdatePasswordModel.validateAsync({
            newPassword,
            repeatPassword
        }).then(() => {
            return this.getOnebyId(id).then(found => {
                if (!found) { throw new Error("User don\'t exist."); }
                return found.comparePassword(password).then(isMatch => {
                    if (!isMatch) { throw new Error("Password is incorrect."); }
                    found.password = newPassword;
                    return found.save();
                });
            });
        });
    }
}

export const userRepository = new UserRepository();
