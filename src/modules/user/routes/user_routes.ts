import { Router } from "express";
import UserController from "../controller/userController";
import { AuthMiddleware } from "../../../config/check_token";



const user_router = Router();

user_router.use(AuthMiddleware.authenticateToken);
user_router.use(AuthMiddleware.isUser);
user_router.get("/get-job-list", UserController.jobList);
user_router.get("/get-job-list/:id", UserController.getJobById);
user_router.get("/search", UserController.searchJOB);
user_router.post("/add-job", UserController.CreateJOB);
user_router.patch("/update-job/:id", UserController.updateJOB);
user_router.delete("/delete-job/:id", UserController.deleteJOB);
user_router.get('/is-user-login', UserController.isUserLogin);


export default user_router;