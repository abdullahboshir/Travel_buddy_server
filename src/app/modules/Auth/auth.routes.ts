import express from 'express';
import { changePasswordController, userLoginController } from './auth.controllers';
import auth from '../../middelware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();



router.post('/login', userLoginController);
router.post('/change-password', auth(UserRole.ADMIN, UserRole.TRAVELER), changePasswordController);


export const AuthRouters = router;