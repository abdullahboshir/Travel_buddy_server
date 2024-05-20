"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const trip_router_1 = require("../modules/Trip/trip.router");
const user_routes_1 = require("../modules/User/user.routes");
const travelBuddies_routes_1 = require("../modules/TravelBuddies/travelBuddies.routes");
const router = express_1.default.Router();
const items = [
    {
        path: '/',
        route: trip_router_1.TripRoutes
    },
    {
        path: '/',
        route: auth_routes_1.AuthRouters
    },
    {
        path: '/',
        route: user_routes_1.UserRouters
    },
    {
        path: '/',
        route: travelBuddies_routes_1.TravelBuddiesRoutes
    }
];
items.forEach(route => router.use(route.path, route.route));
exports.default = router;
