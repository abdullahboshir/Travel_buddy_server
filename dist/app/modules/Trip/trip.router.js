"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRoutes = void 0;
const express_1 = __importDefault(require("express"));
const trip_controllers_1 = require("./trip.controllers");
const auth_1 = __importDefault(require("../../middelware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TRAVELER), trip_controllers_1.craeteTripController);
router.get('/', trip_controllers_1.getTripController);
router.post('/:tripId/request', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TRAVELER), trip_controllers_1.sendBuddyReqController);
router.put('/update/:tripId', trip_controllers_1.updateTripController);
router.get('/getSingleTrip/:tripId', trip_controllers_1.getSingleTripController);
router.get('/getUserTrip', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TRAVELER), trip_controllers_1.getUserTripController);
router.delete('/delete/:tripId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TRAVELER), trip_controllers_1.deleteTripController);
exports.TripRoutes = router;
