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
exports.createAdminController = void 0;
const sendResponseHandler_1 = require("../../utils/sendResponseHandler");
const tryCatchHandler_1 = require("../../utils/tryCatchHandler");
const admin_services_1 = require("./admin.services");
exports.createAdminController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, admin_services_1.createAdminService)(req.body);
    (0, sendResponseHandler_1.sendReponseHandler)(res, {
        success: true,
        statusCode: 201,
        message: "Traveler created successfully",
        data: result
    });
}));
