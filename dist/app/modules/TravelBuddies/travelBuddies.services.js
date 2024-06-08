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
exports.getRequstedBuddiesService = exports.respondTravelReqService = exports.getSingleTravelBuddiesServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../../Shered/prisma");
const ApiErrors_1 = require("../../errors/ApiErrors");
const config_1 = __importDefault(require("../../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getSingleTravelBuddiesServices = (token, param) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.FORBIDDEN, "Unauthorized Access");
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
    const getTrip = yield prisma_1.prisma.travelBuddyRequest.findFirst({
        where: param,
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    });
    return getTrip;
});
exports.getSingleTravelBuddiesServices = getSingleTravelBuddiesServices;
const respondTravelReqService = (token, param, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.FORBIDDEN, "Unauthorized Access");
    }
    ;
    const verifyToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt.jwt_secret);
    const respondReq = yield prisma_1.prisma.travelBuddyRequest.update({
        where: {
            id: param.buddyId,
            tripId: payload.tripId
        },
        data: {
            status: payload.status
        }
    });
    return respondReq;
});
exports.respondTravelReqService = respondTravelReqService;
const getRequstedBuddiesService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.FORBIDDEN, "Unauthorized Access");
    }
    const isExistUser = yield prisma_1.prisma.user.findUnique({
        where: {
            id: user.id
        }
    });
    if (!isExistUser) {
        throw new ApiErrors_1.ApiErrors(false, http_status_1.default.NOT_FOUND, 'USER not found!');
    }
    const tripReqStatus = yield prisma_1.prisma.travelBuddyRequest.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            trip: true
        }
    });
    const tripDestination = [];
    for (const request of tripReqStatus) {
        const destination = yield prisma_1.prisma.trip.findMany({
            where: {
                id: request.tripId
            }
        });
        tripDestination.push(destination);
    }
    return Object.assign(Object.assign({}, tripReqStatus), tripDestination);
});
exports.getRequstedBuddiesService = getRequstedBuddiesService;
