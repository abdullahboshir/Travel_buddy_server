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
exports.updateUserService = exports.getUserProfileService = exports.createUserServices = void 0;
const prisma_1 = require("../../../Shered/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const createUserServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (isExistUser) {
        return {
            message: 'User already registered'
        };
    }
    ;
    const hashedPass = yield bcrypt_1.default.hash(payload.password, 12);
    payload.password = hashedPass;
    const createUser = yield prisma_1.prisma.$transaction((usedTransaction) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield usedTransaction.user.create({
            data: payload,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        const createUserProfile = yield usedTransaction.userProfile.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                },
                age: 0,
                bio: ""
            }
        });
        return user;
    }));
    return createUser;
});
exports.createUserServices = createUserServices;
const getUserProfileService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new Error('Your are not authorizaed!');
    }
    ;
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.jwt_secret);
    const result = yield prisma_1.prisma.user.findFirst({
        where: {
            id: decoded.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
exports.getUserProfileService = getUserProfileService;
const updateUserService = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (!token) {
        throw new Error('Your are not authorizaed!');
    }
    ;
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.jwt_secret);
    if ((payload === null || payload === void 0 ? void 0 : payload.email) || (payload === null || payload === void 0 ? void 0 : payload.name)) {
        result = yield prisma_1.prisma.user.update({
            where: {
                id: decoded.id
            },
            data: payload,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
    ;
    if ((payload === null || payload === void 0 ? void 0 : payload.bio) || (payload === null || payload === void 0 ? void 0 : payload.age)) {
        result = yield prisma_1.prisma.userProfile.update({
            where: {
                userId: decoded.id
            },
            data: payload
        });
    }
    return result;
});
exports.updateUserService = updateUserService;
