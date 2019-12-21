"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var faker_1 = __importDefault(require("faker"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mongoose_1 = __importDefault(require("mongoose"));
var secrets_1 = require("../../../utils/secrets");
var salt = bcryptjs_1.default.genSaltSync(10);
var hash = bcryptjs_1.default.hashSync("St@r1234", salt);
var users = [];
if (secrets_1.ENVIRONMENT === "development") {
    for (var i = 0; i < 100; i++) {
        var userId = mongoose_1.default.Types.ObjectId();
        users.push({
            _id: userId,
            id: undefined,
            email: faker_1.default.internet.email().toLowerCase(),
            password: hash,
            name: faker_1.default.name.firstName(),
            gender: faker_1.default.random.arrayElement(["MALE", "FEMALE"]),
            address: faker_1.default.address.streetAddress(true),
            dateOfBirth: faker_1.default.date.past(),
            phoneNumber: faker_1.default.phone.phoneNumber(),
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        });
    }
}
module.exports = users;
