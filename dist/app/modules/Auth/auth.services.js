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
exports.userLoginServices = void 0;
const prisma_1 = require("../../../Shered/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const ApiErrors_1 = require("../../errors/ApiErrors");
const http_status_1 = __importDefault(require("http-status"));
const userLoginServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (!isExistUser) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.NOT_FOUND, 'USER not found!');
    }
    const isPassValid = yield bcrypt_1.default.compare(payload.password, isExistUser.password);
    if (!isPassValid) {
        throw new Error('Your password deos not match');
    }
    ;
    const tokenPayload = {
        id: isExistUser.id,
        email: isExistUser.email
    };
    const accessToken = jsonwebtoken_1.default.sign(tokenPayload, config_1.default.jwt.jwt_secret, { expiresIn: config_1.default.jwt.jwt_expireIn });
    const data = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: isExistUser.email
        }
    });
    return {
        data,
        accessToken
    };
});
exports.userLoginServices = userLoginServices;
