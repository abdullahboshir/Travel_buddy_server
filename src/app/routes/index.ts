import express from 'express';
import { AuthRouters } from "../modules/Auth/auth.routes";
import { TripRoutes } from "../modules/Trip/trip.router";
import { UserRouters } from "../modules/User/user.routes";
import { TravelBuddiesRoutes } from '../modules/TravelBuddies/travelBuddies.routes';

const router = express.Router();


const items = [
    {
        path: '/',
        route: TripRoutes
    },
    {
        path: '/',
        route: AuthRouters
    },
    {
        path: '/',
        route: UserRouters
    },
    {
        path: '/',
        route: TravelBuddiesRoutes
    }
];

items.forEach(route => router.use(route.path, route.route));

export default router;