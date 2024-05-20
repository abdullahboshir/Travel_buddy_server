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
exports.sendBuddyReqServices = exports.getTripService = exports.createTripService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../Shered/prisma");
const calculatePagination_1 = require("../../helpers/calculatePagination");
const ApiErrors_1 = require("../../errors/ApiErrors");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const dateFinder_1 = require("../../../Shered/dateFinder");
const createTripService = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.FORBIDDEN, "Unauthorized Access");
    }
    ;
    const verifyToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt.jwt_secret);
    const isExistUser = yield prisma_1.prisma.user.findUnique({
        where: {
            id: payload.userId
        }
    });
    if (!isExistUser) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.NOT_FOUND, 'USER not found!');
    }
    payload.startDate = (0, dateFinder_1.parseDate)(payload.startDate);
    payload.endDate = (0, dateFinder_1.parseDate)(payload.endDate);
    const createTrip = yield prisma_1.prisma.trip.create({
        data: payload
    });
    return createTrip;
});
exports.createTripService = createTripService;
const getTripService = (query, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const condition = [];
    const { page, limit, skip, sortBy, sortOrder } = (0, calculatePagination_1.calculatePagination)(pagination);
    const { startDate, endDate, minBudget, maxBudget } = filterData, stringData = __rest(filterData, ["startDate", "endDate", "minBudget", "maxBudget"]);
    if (stringData.budget && !NaN) {
        stringData.budget = Number(query.budget);
    }
    else if (minBudget && !NaN && maxBudget && !NaN) {
        query.minBudget = Number(minBudget);
        query.maxBudget = Number(maxBudget);
    }
    ;
    if (searchTerm) {
        condition.push({
            OR: ['destination'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    ;
    if (Object.keys(stringData).length > 0) {
        condition.push({
            AND: Object.keys(stringData).map(key => ({
                [key]: {
                    equals: stringData[key]
                }
            }))
        });
    }
    ;
    if (startDate && endDate) {
        condition.push({
            OR: [
                {
                    startDate: { gte: (0, dateFinder_1.parseDate)(startDate) }, endDate: { lte: (0, dateFinder_1.parseDate)(endDate) }
                },
                {
                    startDate: { gte: (0, dateFinder_1.parseDate)(startDate) }, endDate: { lte: (0, dateFinder_1.parseDate)(endDate) }
                }
            ]
        });
    }
    ;
    if (minBudget && maxBudget) {
        condition.push({
            budget: {
                gte: query.minBudget,
                lte: query.maxBudget
            }
        });
    }
    ;
    const andCondition = { AND: condition };
    const result = yield prisma_1.prisma.trip.findMany({
        where: andCondition,
        skip,
        take: limit,
        orderBy: pagination.sortBy && pagination.sortOrder ? {
            [pagination.sortBy]: pagination.sortBy
        } : {
            destination: pagination.sortOrder
        }
    });
    const total = yield prisma_1.prisma.trip.count({
        where: andCondition
    });
    const meta = {
        page,
        limit,
        total
    };
    return {
        meta,
        date: result
    };
});
exports.getTripService = getTripService;
const sendBuddyReqServices = (token, param, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.FORBIDDEN, "Unauthorized Access");
    }
    ;
    const verifyToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt.jwt_secret);
    const isExistUser = yield prisma_1.prisma.user.findUnique({
        where: {
            id: payload.userId
        }
    });
    if (!isExistUser) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.NOT_FOUND, 'USER not found!');
    }
    ;
    const isExisTrip = yield prisma_1.prisma.trip.findUnique({
        where: {
            id: param.tripId
        }
    });
    if (!isExisTrip) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.NOT_FOUND, 'TRIP not found!');
    }
    ;
    const sendReq = yield prisma_1.prisma.travelBuddyRequest.create({
        data: {
            tripId: param.tripId,
            userId: payload.userId,
            status: client_1.status.PENDING
        }
    });
    return sendReq;
});
exports.sendBuddyReqServices = sendBuddyReqServices;
