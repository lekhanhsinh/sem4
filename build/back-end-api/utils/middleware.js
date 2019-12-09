"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = function (req, connection) {
    return {
        req: req,
        connection: connection
    };
};
exports.subscriptionOnConnect = function () {
    return {};
};
