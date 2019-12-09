import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";
import { EmployeeDocument } from "@back-end-database/models/Employee/types";

const authEmployeeResolvers: IResolvers = {
    Mutation: {
        login: (obj, args, context, info): Promise<EmployeeDocument> => {
            const { req } = context;
            const { email, password } = args;
            return Repositories.employeeRepository.getOnebyEmail(email)
                .then(function (Employee) {
                    if (!Employee) {
                        throw new Error("Access Denied.");
                    }
                    return Employee.comparePassword(password).then((isMatch) => {
                        if (!isMatch) {
                            throw new Error("Access Denied.");
                        }
                        req.session.Employee = {
                            id: Employee.id,
                        };
                        return Employee;
                    });
                });
        },
        logout: (obj, args, context, info): Promise<string> => {
            const { req } = context;
            const { Employee } = req.session;
            if (!Employee) {
                throw new Error("Access Denied.");
            }
            req.session.Employee = undefined;
            return Promise.resolve("LOGGED OUT");
        },
    },
};
export default authEmployeeResolvers;