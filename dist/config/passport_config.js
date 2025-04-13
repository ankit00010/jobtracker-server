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
exports.initializePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_repository_1 = __importDefault(require("../modules/auth/repository/auth_repository"));
const initializePassport = () => {
    // JWT token generator scoped under the function
    const generateToken = (user) => {
        const SECRET_KEY = process.env.JWT_SECRET || '';
        const EXPIRES_IN = '1d';
        const payload = {
            userId: user.id,
            email: user.email,
        };
        return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
    };
    // Use Google strategy
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Profile", profile);
            const user = yield auth_repository_1.default.handleGoogleCheck(profile);
            console.log("User Data", user);
            const token = generateToken(user);
            return done(null, { user, token });
        }
        catch (error) {
            console.error('Authentication error:', error);
            done(error, false);
        }
    })));
    // Session config (optional)
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
};
exports.initializePassport = initializePassport;
