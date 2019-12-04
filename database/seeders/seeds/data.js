"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = __importDefault(require("faker"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mongoose_1 = __importDefault(require("mongoose"));
var secrets_1 = require("../../startup/secrets");
var adminId = mongoose_1.default.Types.ObjectId();
var adminRoleId = mongoose_1.default.Types.ObjectId();
var salt = bcryptjs_1.default.genSaltSync(10);
var hash = bcryptjs_1.default.hashSync("St@r1234", salt);
var users = [
    {
        _id: adminId,
        email: "admin@gmail.com",
        password: hash,
        roles: [adminRoleId],
        details: [{
                name: "Admin",
            }]
    }
];
exports.users = users;
var roles = [
    {
        _id: adminRoleId,
        name: "Admin",
        description: "",
    },
];
exports.roles = roles;
if (secrets_1.ENVIRONMENT === "development") {
    for (var i = 0; i < 100; i++) {
        var userId = mongoose_1.default.Types.ObjectId();
        var gender = Math.round(Math.random());
        users.push({
            _id: userId,
            email: faker_1.default.internet.email(),
            password: hash,
            fisrtName: faker_1.default.name.firstName(gender),
            lastName: faker_1.default.name.lastName(gender),
            avatar: "default-avatar.png",
            dateOfBirth: faker_1.default.date.past(),
            gender: gender === 1 ? "MALE" : "FEMALE",
            address: faker_1.default.address.streetAddress,
            phoneNumber: faker_1.default.phone.phoneNumber(),
        });
    }
}
