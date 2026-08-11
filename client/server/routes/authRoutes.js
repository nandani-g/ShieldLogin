
// Route - when this URL is requested with this method, run this function
//  Endpoint = the URL address (/api/auth/login)
// Route = the actual code that listens for that endpoint and decides what to do

import express from 'express';
import { login, logout, register, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from '../controller/authController.js';
import userAuth from '../middleware/userauth.js';



const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);
 

export default authRouter;