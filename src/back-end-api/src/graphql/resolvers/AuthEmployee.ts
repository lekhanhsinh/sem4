import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";
import { EmployeeDocument } from "@back-end-database/models/Employee/types";

const authEmployeeResolvers: IResolvers = {
    Mutation: {
        loginEmployee: (obj, args, context, info): Promise<EmployeeDocument> => {
            const { req } = context;
            const { email, password } = args;
            return Repositories.employeeRepository.getOnebyEmail(email)
                .then((employee) => {
                    if (!employee) {
                        throw new Error("Access Denied.");
                    }
                    return employee.comparePassword(password).then((isMatch) => {
                        if (!isMatch) {
                            throw new Error("Access Denied.");
                        }
                        req.session.employee = {
                            id: employee.id,
                        };
                        return employee;
                    });
                });
        },
        logoutEmployee: (obj, args, context, info): Promise<string> => {
            const { req } = context;
            const { employee } = req.session;
            if (!employee) {
                throw new Error("Access Denied.");
            }
            req.session.employee = undefined;
            return Promise.resolve("LOGGED OUT");
        },
    },
};
export default authEmployeeResolvers;