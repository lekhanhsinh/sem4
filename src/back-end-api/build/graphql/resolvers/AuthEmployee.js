"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _back_end_database_1 = require("@back-end-database");
var authEmployeeResolvers = {
    Mutation: {
        loginEmployee: function (obj, args, context, info) {
            var req = context.req;
            var email = args.email, password = args.password;
            return _back_end_database_1.Repositories.employeeRepository.getOnebyEmail(email)
                .then(function (employee) {
                if (!employee) {
                    throw new Error("Access Denied.");
                }
                return employee.comparePassword(password).then(function (isMatch) {
                    if (!isMatch) {
                        throw new Error("Access Denied.");
                    }
                    if (req.session.employee) {
                        req.session.employee.logged = true;
                    }
                    else {
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
        logoutEmployee: function (obj, args, context, info) {
            var req = context.req;
            var employee = req.session.employee;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            employee.logged = false;
            return Promise.resolve("LOGGED OUT");
        },
    },
};
exports.default = authEmployeeResolvers;
