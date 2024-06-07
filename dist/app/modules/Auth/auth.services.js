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
exports.changePasswordService = exports.userLoginServices = void 0;
const prisma_1 = require("../../../Shered/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const ApiErrors_1 = require("../../errors/ApiErrors");
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const userLoginServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload === null || payload === void 0 ? void 0 : payload.email
        }
    });
    if (!isExistUser) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.NOT_FOUND, 'USER not found!');
    }
    const isPassValid = yield bcrypt_1.default.compare(payload.password, isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.password);
    if (!isPassValid) {
        throw new Error('Your password deos not match');
    }
    ;
    const tokenPayload = {
        id: isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.id,
        role: isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.role,
        email: isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.email
    };
    const accessToken = jsonwebtoken_1.default.sign(tokenPayload, config_1.default.jwt.jwt_secret, { expiresIn: config_1.default.jwt.jwt_expireIn });
    const refreshToken = jsonwebtoken_1.default.sign(tokenPayload, config_1.default.jwt.refresh_token_secret, { expiresIn: config_1.default.jwt.refresh_token_expirein });
    const data = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.email
        }
    });
    return {
        data,
        accessToken,
        refreshToken
    };
});
exports.userLoginServices = userLoginServices;
const changePasswordService = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findFirstOrThrow({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVATE
        }
    });
    const isPasswordCorrect = yield bcrypt_1.default.compare(payload.currentPassword, userData.password);
    if (!isPasswordCorrect) {
        throw new Error('Password incorrect');
    }
    ;
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 12);
    yield prisma_1.prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false
        }
    });
    return {
        message: 'Password Changed successfully'
    };
});
exports.changePasswordService = changePasswordService;
