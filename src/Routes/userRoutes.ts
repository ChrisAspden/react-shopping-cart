// routes/userRoutes.ts
//backend routes for user-related actions
import express from 'express';
import { 
    registerUser, 
    verifyLoginCredentials,
    confirmEmail,
    requestPasswordReset,
    resetPassword
 } from '../Controllers/userController';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', verifyLoginCredentials);
router.post('/confirm', confirmEmail);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password-final', resetPassword);


export default router;
