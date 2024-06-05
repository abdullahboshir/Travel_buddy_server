import express from 'express';
import { AuthRouters } from "../modules/Auth/auth.routes";
import { TripRoutes } from "../modules/Trip/trip.router";
import { TravelBuddiesRoutes } from '../modules/TravelBuddies/travelBuddies.routes';
import { TravelerRoutes } from '../modules/Traveler/traveler.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { userRoutes } from '../modules/User/user.routes';

const router = express.Router();


const items = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/trips',
        route: TripRoutes
    },
    {
        path: '/auth',
        route: AuthRouters
    },
    {
        path: '/traveler',
        route: TravelerRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/travelBuddies',
        route: TravelBuddiesRoutes
    }
];

items.forEach(route => router.use(route.path, route.route));

export default router;