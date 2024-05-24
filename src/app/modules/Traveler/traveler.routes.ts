import express from 'express';
import { createTravelerController } from './traveler.controllers';

const router = express.Router();


router.post('/register', createTravelerController);




export const TravelerRoutes = router; 