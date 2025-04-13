"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../../middleware/error"));
const auth_repository_1 = __importDefault(require("../repository/auth_repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static RegisterUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    throw new error_1.default(400, "VALIDATION ERROR", "Invalid Fields");
                }
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
                yield auth_repository_1.default.createUserData(name, email, hashedPassword);
                return res.status(200).json({ code: 200, title: "SUCCESS", message: "Success! Your account is ready to go." });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Ensure both fields are provided
                if (!email || !password) {
                    throw new error_1.default(400, "VALIDATION_ERROR", "Email and Password are required");
                }
                // Check if user exists
                const userData = yield auth_repository_1.default.isUserExists(email);
                if (!userData) {
                    throw new error_1.default(404, "NOT_FOUND", "User does not exist");
                }
                // Ensure password exists in userData
                if (!userData.password) {
                    throw new error_1.default(500, "SERVER_ERROR", "User password is missing in the database");
                }
                console.log(userData.id);
                // Verify password
                const verifyUser = yield bcrypt_1.default.compare(password, userData.password);
                if (!verifyUser) {
                    throw new error_1.default(401, "UNAUTHORIZED", "Invalid Email or Password");
                }
                const SECRET_KEY = process.env.JWT_SECRET || ""; // Use env for security
                const EXPIRES_IN = "1d"; // Token expiration time
                const payload = {
                    userId: userData.id,
                    isUser: true, // or false
                };
                const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
                return res.status(200).json({
                    code: 200,
                    title: "SUCCESS",
                    message: "Login Successfull!",
                    token
                });
            }
            catch (error) {
                if (error instanceof error_1.default) {
                    return res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    return res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    return res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
    static handleGoogleLoginSuccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, token } = req.user;
                console.log("Token check", token);
                console.log("User check", user);
                if (user && token) {
                    return res.status(200).redirect(`${process.env.CLIENT_URL}/verify-user?token=${token}`);
                }
                else {
                    res.status(400).send('Authentication failed');
                }
            }
            catch (error) {
                // Handle known errors thrown within the application
                if (error instanceof error_1.default) {
                    res.status(error.code).json({
                        code: error.code,
                        title: error.title,
                        message: error.message,
                    });
                }
                else if (error instanceof Error) {
                    // Handle unexpected errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: error.message,
                    });
                }
                else {
                    // Handle unknown errors
                    res.status(500).json({
                        code: 500,
                        title: "Internal Server Error",
                        message: "An unknown error occurred",
                    });
                }
            }
        });
    }
}
exports.default = AuthController;
