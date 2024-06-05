"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const trip_router_1 = require("../modules/Trip/trip.router");
const travelBuddies_routes_1 = require("../modules/TravelBuddies/travelBuddies.routes");
const traveler_routes_1 = require("../modules/Traveler/traveler.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const user_routes_1 = require("../modules/User/user.routes");
const router = express_1.default.Router();
const items = [
    {
        path: '/users',
        route: user_routes_1.userRoutes
    },
    {
        path: '/trips',
        route: trip_router_1.TripRoutes
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRouters
    },
    {
        path: '/traveler',
        route: traveler_routes_1.TravelerRoutes
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes
    },
    {
        path: '/travelBuddies',
        route: travelBuddies_routes_1.TravelBuddiesRoutes
    }
];
items.forEach(route => router.use(route.path, route.route));
exports.default = router;
