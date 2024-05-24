import express from 'express';
import { getUsersController, updateUserController } from './user.controllers';
import auth from '../../middelware/auth';
import { UserRole } from '@prisma/client';



const router = express.Router();


router.get('/getUsers', getUsersController);
// router.get('/profile', getTravelerProfileController);
router.put('/update/:id', auth(UserRole.ADMIN), updateUserController);



export const userRoutes = router;


