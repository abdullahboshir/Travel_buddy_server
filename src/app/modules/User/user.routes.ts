import express from 'express';
import { createUserController, getUserProfileController } from './user.controllers';

const router = express.Router();


router.post('/register', createUserController);
router.get('/profile', getUserProfileController);



export const UserRouters = router; 