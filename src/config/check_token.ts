import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Extend Request to include `user` data
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                isUser: boolean;
                token: string;
            };
        }
    }
}

// Interface for JWT payload
interface JWTPayload {
    userId: string;
    isUser: boolean;
    token: string;
}

export class AuthMiddleware {
    private static readonly SECRET_KEY = process.env.JWT_SECRET || "";

    // Middleware to authenticate token
    static authenticateToken = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        // console.log("Token :=>", token);


        if (!token) {
            res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
            return;
        }

        jwt.verify(token, AuthMiddleware.SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        success: false,
                        message: "Token has expired"
                    });
                }
                return res.status(403).json({
                    success: false,
                    message: "Invalid token"
                });
            }
            console.log("Decoded value", decoded);

            const { userId, isUser } = decoded as JWTPayload;

            // Attach user info to request

            req.user = { userId, isUser, token };   
            next();
        });
    };

    // Middleware to check if user is a valid user
    static isUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        if (!req.user?.userId) {
            res.status(403).json({
                success: false,
                message: "Access denied."
            });
            return;
        }

        next();
    };
}
