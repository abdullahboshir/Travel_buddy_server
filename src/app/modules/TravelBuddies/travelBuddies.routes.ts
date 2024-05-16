import express from 'express';
import { getSingleTravelBuddiesController, respondTravelReqController } from './travelBuddies.controllers';


const router = express.Router();


router.get('/travel-buddies/:tripId', getSingleTravelBuddiesController);
router.put('/travel-buddies/:buddyId/respond', respondTravelReqController);


export const TravelBuddiesRoutes = router;


