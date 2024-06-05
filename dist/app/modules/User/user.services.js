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
exports.updateUserService = exports.getTravelerProfileService = exports.getUsersService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../../Shered/prisma");
const ApiErrors_1 = require("../../errors/ApiErrors");
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            needPasswordChange: true,
            status: true,
            userProfile: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
exports.getUsersService = getUsersService;
const getTravelerProfileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            userProfile: true,
        }
    });
    return result;
});
exports.getTravelerProfileService = getTravelerProfileService;
const updateUserService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    const userInfo = yield prisma_1.prisma.user.findUnique({
        where: { id: id }
    });
    if (!userInfo) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.FORBIDDEN, 'User Not Found!');
    }
    const filtered = Object.keys(payload)
        .filter(key => payload[key] !== '' && payload[key] !== null && payload[key] !== undefined && payload[key] !== 0)
        .reduce((obj, key) => {
        obj[key] = payload[key];
        return obj;
    }, {});
    const userPayload = {};
    const userProfilePayload = {};
    const userKeys = ['email', 'username', 'role', 'status'];
    const userProfileKeys = ['bio', 'age', 'contactNumber', 'address', 'profilePhoto'];
    for (const key in filtered) {
        if (userKeys.includes(key)) {
            userPayload[key] = filtered[key];
        }
        else if (userProfileKeys.includes(key)) {
            userProfilePayload[key] = filtered[key];
        }
    }
    if (Object.keys(userPayload).length > 0) {
        result = yield prisma_1.prisma.user.update({
            where: {
                id
            },
            data: userPayload,
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        });
        console.log('updateeeeeeeeeeeeeeeeeeeeeeee', result);
    }
    if (Object.keys(userProfilePayload).length > 0) {
        result = yield prisma_1.prisma.userProfile.update({
            where: {
                userId: id
            },
            data: userProfilePayload
        });
    }
    return result;
});
exports.updateUserService = updateUserService;
