import Joi from "@hapi/joi";

import BasicRepository from "./BasicRepository";
import * as Models from "../models";
import { EmployeeDocument, Employee } from "../models/Employee/types";

const EmployeeModel = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/),
});

export class EmployeeRepository extends BasicRepository<EmployeeDocument> {
    constructor() {
        super(Models.Employee);
    }

    getOnebyEmail = (
        email: string,
        populate: string[] = []
    ): Promise<EmployeeDocument | null> => {
        return this._collection.findOne({ email })
            .populate(populate)
            .exec();
    }

    register = (
        email: string,
        password: string,
        repeatPassword: string,
        detail: unknown
    ): Promise<EmployeeDocument> => {
        const RegisterModel = EmployeeModel.concat(Joi.object({
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
            }) as Promise<EmployeeDocument>;
        });
    }

    updateDetail = (
        id: string,
        detail: unknown
    ): Promise<EmployeeDocument> => {
        return EmployeeModel.validateAsync({
            ...(detail as Employee)
        }).then(() => {
            return this.getOnebyId(id).then(found => {
                if (!found) { throw new Error("Employee don\'t exist."); }
                found.name = (detail as Employee).name || found.name;
                return found.save();
            });
        });
    }

    updatePassword = (
        id: string,
        password: string,
        newPassword: string,
        repeatPassword: string
    ): Promise<EmployeeDocument> => {
        const UpdatePasswordModel = Joi.object({
            newPassword: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/).required(),
            repeatPassword: Joi.ref("newPassword")
        });
        return UpdatePasswordModel.validateAsync({
            newPassword,
            repeatPassword
        }).then(() => {
            return this.getOnebyId(id).then(found => {
                if (!found) { throw new Error("Employee don\'t exist."); }
                return found.comparePassword(password).then(isMatch => {
                    if (!isMatch) { throw new Error("Password is incorrect."); }
                    found.password = newPassword;
                    return found.save();
                });
            });
        });
    }
}

export const employeeRepository = new EmployeeRepository();
