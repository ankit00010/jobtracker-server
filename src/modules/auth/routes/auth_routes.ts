import { Router } from "express";
import AuthController from "../controller/aut_controller";
import passport from "passport";




const auth_router = Router();




auth_router.post('/register', AuthController.RegisterUser);
auth_router.post('/login', AuthController.loginUser);
auth_router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

auth_router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/verify-user`, // 👈 redirect on failure
    }),
    AuthController.handleGoogleLoginSuccess // 👈 successful login
);



export default auth_router;



