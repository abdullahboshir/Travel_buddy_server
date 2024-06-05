import express from 'express';
import { getTravelerProfileController, getUsersController, updateUserController } from './user.controllers';
import auth from '../../middelware/auth';
import { UserRole } from '@prisma/client';



const router = express.Router();


router.get('/getUsers', getUsersController);
router.get('/profile', auth(UserRole.ADMIN, UserRole.TRAVELER), getTravelerProfileController);
router.put('/update/:id', auth(UserRole.ADMIN, UserRole.TRAVELER), updateUserController);
router.put('/admin/update/:id', auth(UserRole.ADMIN), updateUserController);



export const userRoutes = router;


