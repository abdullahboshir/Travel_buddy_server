import express from 'express';
import { getRequstedBuddiesController, getSingleTravelBuddiesController, respondTravelReqController } from './travelBuddies.controllers';
import auth from '../../middelware/auth';
import { UserRole } from '@prisma/client';


const router = express.Router();


router.get('/travel-buddies/:tripId', getSingleTravelBuddiesController);
router.get('/requestedList', auth(UserRole.ADMIN, UserRole.TRAVELER), getRequstedBuddiesController);
router.put('/travel-buddies/:buddyId/respond', respondTravelReqController);


export const TravelBuddiesRoutes = router;


