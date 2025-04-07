import { Request, Response } from "express";
import ThrowError from "../../../middleware/error";
import AuthRepository from "../repository/auth_repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {



    static async RegisterUser(
        req: Request,
        res: Response
    ): Promise<any> {
        try {

            const { name, email, password } = req.body;



            if (!name || !email || !password) {
                throw new ThrowError(400, "VALIDATION ERROR", "Invalid Fields")
            }


            const isExists = await AuthRepository.isUserExists(email);

            if (isExists) {
                throw new ThrowError(409, "CONFLICT", "User already exists");
            }
            const saltRounds = 10

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await AuthRepository.createUserData(name, email, hashedPassword);


            return res.status(200).json({ code: 200, title: "SUCCESS", message: "Success! Your account is ready to go." });

        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }








    static async loginUser(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            // Ensure both fields are provided
            if (!email || !password) {
                throw new ThrowError(400, "VALIDATION_ERROR", "Email and Password are required");
            }

            // Check if user exists
            const userData = await AuthRepository.isUserExists(email);
            if (!userData) {
                throw new ThrowError(404, "NOT_FOUND", "User does not exist");
            }

            // Ensure password exists in userData
            if (!userData.password) {
                throw new ThrowError(500, "SERVER_ERROR", "User password is missing in the database");
            }

            console.log(userData.id);
            

            // Verify password
            const verifyUser = await bcrypt.compare(password, userData.password);
            if (!verifyUser) {
                throw new ThrowError(401, "UNAUTHORIZED", "Invalid Email or Password");
            }
            const SECRET_KEY = process.env.JWT_SECRET || ""; // Use env for security
            const EXPIRES_IN = "1d"; // Token expiration time
            const payload = {
                userId:userData.id,
                isUser: true, // or false
            };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
            return res.status(200).json({
                code: 200,
                title: "SUCCESS",
                message: "Login Successfull!",
                token
            });

        } catch (error) {
            if (error instanceof ThrowError) {
                return res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                return res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }





   



}


export default AuthController;