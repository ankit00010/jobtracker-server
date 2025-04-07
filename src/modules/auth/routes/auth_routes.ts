import { Router } from "express";
import AuthController from "../controller/aut_controller";




const auth_router = Router();




auth_router.post('/register', AuthController.RegisterUser);
auth_router.post('/login', AuthController.loginUser);


export default auth_router;



