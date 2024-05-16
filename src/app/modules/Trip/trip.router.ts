import express from 'express';
import { craeteTripController, getTripController, sendBuddyReqController } from './trip.controllers';

const router = express.Router();

router.post('/trips', craeteTripController);
router.get('/trips', getTripController);
router.post('/trip/:tripId/request', sendBuddyReqController);


export const TripRoutes = router;


