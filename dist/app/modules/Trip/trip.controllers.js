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
exports.sendBuddyReqController = exports.getTripController = exports.craeteTripController = void 0;
const pick_1 = require("../../../Shered/pick");
const sendResponseHandler_1 = require("../../utils/sendResponseHandler");
const tryCatchHandler_1 = require("../../utils/tryCatchHandler");
const trip_constant_1 = require("./trip.constant");
const trip_services_1 = require("./trip.services");
exports.craeteTripController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, trip_services_1.createTripService)(req.headers.authorization, req.body);
    (0, sendResponseHandler_1.sendReponseHandler)(res, {
        success: true,
        statusCode: 201,
        message: "Trip created successfully",
        data: result
    });
}));
exports.getTripController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, trip_constant_1.tripFilterAbleFields);
    const pagination = (0, pick_1.pick)(req.query, trip_constant_1.paginationFields);
    const result = yield (0, trip_services_1.getTripService)(filters, pagination);
    (0, sendResponseHandler_1.sendReponseHandler)(res, {
        success: true,
        "statusCode": 200,
        "message": "Trips retrieved successfully",
        meta: result.meta,
        data: result.date
    });
}));
exports.sendBuddyReqController = (0, tryCatchHandler_1.tryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, trip_services_1.sendBuddyReqServices)(req.headers.authorization, req.params, req.body);
    (0, sendResponseHandler_1.sendReponseHandler)(res, {
        success: true,
        statusCode: 201,
        message: "Travel buddy request sent successfully",
        data: result
    });
}));
