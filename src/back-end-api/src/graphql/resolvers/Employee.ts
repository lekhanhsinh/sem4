import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";
import { EmployeeDocument } from "@back-end-database/models/Employee/types";

const employeeResolvers: IResolvers = {
    Query: {
        getSelfEmployee: (obj, args, context, info): Promise<EmployeeDocument | null> => {
            const { req } = context;
            const { employee } = req.session;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return Repositories.employeeRepository.getOnebyId(employee.id);
        },
        getEmployee: (obj, args, context, info): Promise<EmployeeDocument | null> => {
            const { id } = args;
            return Repositories.employeeRepository.getOnebyId(id);
        },
        getEmployees: (obj, args, context, info): Promise<EmployeeDocument[]> => {
            const { sort, searchs } = args;
            return Repositories.employeeRepository.getMany(searchs, sort);
        }
    },
    Mutation: {
        updateSelfEmployeeDetail: (obj, args, context, info): Promise<EmployeeDocument> => {
            const { detail } = args;
            const { req } = context;
            const { employee } = req.session;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return Repositories.employeeRepository.updateDetail(employee.id, detail);
        },
        updateSelfEmployeePassword: (obj, args, context, info): Promise<EmployeeDocument> => {
            const { password, newPassword, repeatPassword } = args;
            const { req } = context;
            const { employee } = req.session;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return Repositories.employeeRepository.updatePassword(employee.id, password, newPassword, repeatPassword);
        },
        createEmployee: (obj, args, context, info): Promise<EmployeeDocument> => {
            const { email, password, repeatPassword, detail } = args;
            return Repositories.employeeRepository.register(email, password, repeatPassword, detail);
        },
        updateEmployee: (obj, args, context, info): Promise<EmployeeDocument> => {
            const { id, detail } = args;
            const { req } = context;
            const { employee } = req.session;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return Repositories.employeeRepository.update(id, detail);
        },
        deleteEmployee: (obj, args, context, info): Promise<string> => {
            const { id } = args;
            const { req } = context;
            const { employee } = req.session;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return Repositories.employeeRepository.delete(id).then(employee => {
                if (!employee) { throw new Error("Employee don\'t exist."); }
                return "DELETED";
            });
        },
    }
};

export default employeeResolvers;