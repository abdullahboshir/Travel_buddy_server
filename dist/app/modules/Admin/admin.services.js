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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../Shered/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdminService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, data = __rest(payload, ["password"]);
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
    const createAdmin = yield prisma_1.prisma.$transaction((usedTransaction) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield usedTransaction.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                role: client_1.UserRole.TRAVELER,
                password: payload.password
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        data.userId = user.id;
        data.username = user.username;
        data.role = client_1.UserRole.ADMIN;
        const admin = yield usedTransaction.admin.create({
            data: data,
            select: {
                id: true,
                username: true,
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
                bio: "",
                address: ""
            }
        });
        return admin;
    }));
    return createAdmin;
});
exports.createAdminService = createAdminService;
