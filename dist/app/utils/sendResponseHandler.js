"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReponseHandler = void 0;
const sendReponseHandler = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        meta: (data === null || data === void 0 ? void 0 : data.meta) || null || undefined,
        data: data.data || null || undefined
    });
};
exports.sendReponseHandler = sendReponseHandler;
