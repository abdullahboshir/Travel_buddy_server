"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRoutes = void 0;
const express_1 = __importDefault(require("express"));
const trip_controllers_1 = require("./trip.controllers");
const router = express_1.default.Router();
router.post('/trips', trip_controllers_1.craeteTripController);
router.get('/trips', trip_controllers_1.getTripController);
router.post('/trip/:tripId/request', trip_controllers_1.sendBuddyReqController);
exports.TripRoutes = router;
