import express from 'express';
import { craeteTripController, deleteTripController, getSingleTripController, getTripController, getUserTripController, sendBuddyReqController, updateTripController } from './trip.controllers';
import auth from '../../middelware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post('/create', auth(UserRole.ADMIN, UserRole.TRAVELER), craeteTripController);
router.get('/', getTripController);
router.post('/:tripId/request', auth(UserRole.ADMIN, UserRole.TRAVELER), sendBuddyReqController);
router.put('/update/:tripId', updateTripController);
router.get('/getSingleTrip/:tripId', getSingleTripController);
router.get('/getUserTrip', auth(UserRole.ADMIN, UserRole.TRAVELER), getUserTripController);
router.delete('/delete/:tripId', auth(UserRole.ADMIN), deleteTripController);


export const TripRoutes = router;


