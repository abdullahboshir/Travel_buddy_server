import express from 'express';
import { createAdminController } from './admin.controllers';

const router = express.Router();


router.post('/register', createAdminController);



export const AdminRoutes = router; 