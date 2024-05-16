import express from 'express';
import { userLoginController } from './auth.controllers';

const router = express.Router();



router.post('/login', userLoginController);


export const AuthRouters = router;