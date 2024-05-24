import express from 'express';
import { craeteTripController, getTripController, sendBuddyReqController, updateTripController } from './trip.controllers';
import auth from '../../middelware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post('/create', auth(UserRole.ADMIN), craeteTripController);
router.get('/', getTripController);
router.post('/trip/:tripId/request', sendBuddyReqController);
router.put('/update/:tripId', updateTripController);


export const TripRoutes = router;


