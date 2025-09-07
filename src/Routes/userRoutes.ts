// routes/userRoutes.ts
//backend routes for user-related actions
import express from 'express';
import { 
    registerUser, 
    verifyLoginCredentials,
    confirmEmail,
 } from '../Controllers/userController';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', verifyLoginCredentials);
router.post('/confirm', confirmEmail);



export default router;
