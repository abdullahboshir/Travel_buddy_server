"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelBuddiesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const travelBuddies_controllers_1 = require("./travelBuddies.controllers");
const auth_1 = __importDefault(require("../../middelware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/travel-buddies/:tripId', travelBuddies_controllers_1.getSingleTravelBuddiesController);
router.get('/requestedList', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.TRAVELER), travelBuddies_controllers_1.getRequstedBuddiesController);
router.put('/travel-buddies/:buddyId/respond', travelBuddies_controllers_1.respondTravelReqController);
exports.TravelBuddiesRoutes = router;
