"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrors = void 0;
class ApiErrors extends Error {
    constructor(success, statusCode, message, errorDetails = '') {
        super(message);
        this.success = success;
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
        if (errorDetails) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiErrors = ApiErrors;
