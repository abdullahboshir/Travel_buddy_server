import express from 'express';
import { getRequstedBuddiesController, getSingleTravelBuddiesController, respondTravelReqController } from './travelBuddies.controllers';


const router = express.Router();


router.get('/travel-buddies/:tripId', getSingleTravelBuddiesController);
router.get('/requestedList', getRequstedBuddiesController);
router.put('/travel-buddies/:buddyId/respond', respondTravelReqController);


export const TravelBuddiesRoutes = router;


