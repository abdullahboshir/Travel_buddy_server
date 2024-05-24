import express from 'express';
import { changePassController, userLoginController } from './auth.controllers';

const router = express.Router();



router.post('/login', userLoginController);
router.post('/change-pass', changePassController);


export const AuthRouters = router;