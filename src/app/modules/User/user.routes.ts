import express from 'express';
import { createUserController, getUserProfileController, updateUserController } from './user.controllers';

const router = express.Router();


router.post('/register', createUserController);
router.get('/profile', getUserProfileController);
router.put('/profile', updateUserController);



export const UserRouters = router; 