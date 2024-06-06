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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassController = exports.userLoginController = void 0;
const auth_services_1 = require("./auth.services");
const sendResponseHandler_1 = require("../../utils/sendResponseHandler");
const tryCatchHandler_1 = require("../../utils/tryCatchHandler");
const traveler_services_1 = require("../Traveler/traveler.services");
const http_status_1 = __importDefault(require("http-status"));
exports.userLoginController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.password)) {
        const gUserRegister = yield (0, traveler_services_1.createTravelerService)(req.body);
        const gUserInfo = {
            email: gUserRegister === null || gUserRegister === void 0 ? void 0 : gUserRegister.email,
            password: '12345'
        };
        req.body = gUserInfo;
    }
    ;
    const result = yield (0, auth_services_1.userLoginServices)(req.body);
    res.cookie('refreshToken', result.refreshToken, {
        secure: false,
        httpOnly: true
    });
    console.log(result);
    (0, sendResponseHandler_1.sendReponseHandler)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Logged in successfully",
        data: {
            id: result.data.id,
            accessToken: result.accessToken,
            role: (_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.role,
            needPasswordChange: result.data.needPasswordChange
        }
    });
}));
exports.changePassController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_services_1.changePassService)(req.headers.authorization, req.body);
    (0, sendResponseHandler_1.sendReponseHandler)(res, {
        success: true,
        statusCode: 201,
        message: "Password changed successfully",
        data: {
            result
            // id:  result.data.id,
            // name: result.data.username,
            // email: result.data.email,
            // token: result.accessToken
        }
    });
}));
