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
                        if (req.session.employee) {
                            req.session.employee.logged = true;
                        } else {
                            req.session.employee = {
                                id: employee.id,
                                email: employee.email,
                                logged: true
                            };
                        }
                        return employee;
                    });
                });
        },
        logoutEmployee: (obj, args, context, info): Promise<string> => {
            const { req } = context;
            const { employee } = req.session;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            employee.logged = false;
            return Promise.resolve("LOGGED OUT");
        },
    },
};
export default authEmployeeResolvers;