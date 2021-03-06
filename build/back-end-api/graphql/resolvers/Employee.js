"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _back_end_database_1 = require("@back-end-database");
var employeeResolvers = {
    Query: {
        getSelfEmployee: function (obj, args, context, info) {
            var req = context.req;
            var employee = req.session.employee;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.employeeRepository.getOnebyId(employee.id);
        },
        getEmployee: function (obj, args, context, info) {
            var id = args.id;
            return _back_end_database_1.Repositories.employeeRepository.getOnebyId(id);
        },
        getEmployees: function (obj, args, context, info) {
            var sort = args.sort, searchs = args.searchs;
            return _back_end_database_1.Repositories.employeeRepository.getMany(searchs, sort);
        }
    },
    Mutation: {
        updateSelfEmployeeDetail: function (obj, args, context, info) {
            var detail = args.detail;
            var req = context.req;
            var employee = req.session.employee;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.employeeRepository.updateDetail(employee.id, detail);
        },
        updateSelfEmployeePassword: function (obj, args, context, info) {
            var password = args.password, newPassword = args.newPassword, repeatPassword = args.repeatPassword;
            var req = context.req;
            var employee = req.session.employee;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.employeeRepository.updatePassword(employee.id, password, newPassword, repeatPassword);
        },
        createEmployee: function (obj, args, context, info) {
            var email = args.email, password = args.password, repeatPassword = args.repeatPassword, detail = args.detail;
            return _back_end_database_1.Repositories.employeeRepository.register(email, password, repeatPassword, detail);
        },
        updateEmployee: function (obj, args, context, info) {
            var id = args.id, detail = args.detail;
            var req = context.req;
            var employee = req.session.employee;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.employeeRepository.update(id, detail);
        },
        deleteEmployee: function (obj, args, context, info) {
            var id = args.id;
            var req = context.req;
            var employee = req.session.employee;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return _back_end_database_1.Repositories.employeeRepository.delete(id).then(function (employee) {
                if (!employee) {
                    throw new Error("Employee don\'t exist.");
                }
                return "DELETED";
            });
        },
    }
};
exports.default = employeeResolvers;
