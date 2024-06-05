"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.getTravelerProfileController = exports.getUsersController = void 0;
const sendResponseHandler_1 = require("../../utils/sendResponseHandler");
const tryCatchHandler_1 = require("../../utils/tryCatchHandler");
const user_services_1 = require("./user.services");
exports.getUsersController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_services_1.getUsersService)();
    (0, sendResponseHandler_1.sendReponseHandler)(res, {
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully",
        data: result
    });
}));
exports.getTravelerProfileController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_services_1.getTravelerProfileService)(req.user.id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Traveler profile retrieved successfully",
        data: result
    });
}));
exports.updateUserController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_services_1.updateUserService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Traveler profile retrieved successfully",
        data: result
    });
}));
