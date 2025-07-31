// routes/userRoutes.ts
import express from 'express';
import { registerUser, verifyLoginCredentials } from '../Controllers/userController';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', verifyLoginCredentials);



export default router;
